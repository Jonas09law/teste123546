import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function verifyToken(body: any, secret: string, receivedToken: string | null) {
  const payload = JSON.stringify(body);
  const expectedToken = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return expectedToken === receivedToken;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const receivedToken = req.headers.get("x-webhook-signature");

    if (!receivedToken) {
      return NextResponse.json({ success: false, message: "Token ausente" }, { status: 401 });
    }

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      console.error("ERRO: WEBHOOK_SECRET não configurado.");
      return NextResponse.json({ success: false, message: "Configuração ausente" }, { status: 500 });
    }

    const isValid = verifyToken(body, WEBHOOK_SECRET, receivedToken);
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Token inválido" }, { status: 403 });
    }

    console.log("Webhook autenticado com sucesso:", body);

    return NextResponse.json({ success: true, message: "Webhook recebido e autenticado" });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return NextResponse.json({ success: false, message: "Erro interno" }, { status: 500 });
  }
}
