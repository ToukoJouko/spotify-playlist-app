import React from "react";

//Auth rquests through this Url
const authEndpoint = "https://accounts.spotify.com/authorize";
//If login successful redirect to this Uri
const redirectUri = "http://localhost:3000/";
const clientId = "67c66cd2a61748088c5f1ac7cc9e76f4";

//access to users email, playlists and top tracks
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "user-top-read",
];
const scopesString = scopes.join("%20");

//user gets authorization through this Url
//show_dialog=true, permission to use the app is asked every time every when the user tries to login
const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&show_dialog=true&redirect_uri=${redirectUri}&scope=${scopesString}`;

const Login = () => {
  return (
    <div>
      <a href={loginUrl}>login with spotify</a>
    </div>
  );
};

export default Login;
