require("dotenv").config();

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://localhost:3001/";
const clientId = process.env.SPOTIFY_CLIENT_ID;

//access to users email, playlists and top tracks
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlsit-modify-public",
  "user-top-read",
];
const scopesString = scopes.join("%20");

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopesString}`;
