import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const guildId = '1253439876163174431';
  const token = process.env.DISCORD_BOT_TOKEN;

  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
    headers: {
      Authorization: `Bot ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao buscar guild', status: res.status }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
} 