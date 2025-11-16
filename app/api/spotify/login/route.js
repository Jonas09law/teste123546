export async function GET() {
  const scope = "user-read-currently-playing user-read-playback-state";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: "https://marceloexpress.vercel.app/api/spotify/callback"
  });

  return Response.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`, 302);
}
