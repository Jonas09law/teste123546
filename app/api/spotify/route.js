export async function GET() {
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: "grant_type=refresh_token&refresh_token=" +
      process.env.SPOTIFY_REFRESH_TOKEN,
  });

  const { access_token } = await tokenRes.json();

  const currentlyPlaying = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (currentlyPlaying.status === 204) {
    return Response.json({ playing: false });
  }

  const data = await currentlyPlaying.json();

  return Response.json({
    playing: true,
    name: data.item.name,
    artist: data.item.artists.map(a => a.name).join(", "),
    album: data.item.album.name,
    image: data.item.album.images[0].url,
  });
}