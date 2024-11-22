import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "fcecfc72172e4cd267473117a17cbd4d",
  clientSecret: "a6338157c9bb5ac9c71924cb2940e1a7",
  redirectUri: "http://www.example.com/callback",
});

async function getAccessToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);
    console.log("Access token obtained:", data.body.access_token);
  } catch (error) {
    console.error("Error obtaining access token:", error);
  }
}

export const callGetArtistAlbum = () => {
  getAccessToken();
  // Get Elvis' albums
  spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
    function (data) {
      console.log("Artist albums", data.body);
    },
    function (err) {
      console.error(err);
    }
  );
};
