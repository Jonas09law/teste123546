export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://marceloexpress.vercel.app/api/spotify/callback",
    }),
  });

  const data = await res.json();

  return new Response(`
    <h1>Refresh Token:</h1>
    <pre>${data.refresh_token}</pre>
    <p>Copie e coloque no .env como SPOTIFY_REFRESH_TOKEN</p>
  `, { headers: { "Content-Type": "text/html" } });
}
