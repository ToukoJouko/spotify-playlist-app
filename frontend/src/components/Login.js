import React from "react";
import { Github, Spotify } from "grommet-icons";
import { Box, Heading, Button, Footer, Anchor } from "grommet";

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

const pad = { horizontal: "small", top: "25vh" };

const Login = () => {
  return (
    <div>
      <Box justify="center" align="center" pad={pad}>
        <Box direction="row" align="center" justify="center" gap="small">
          <Spotify color="dark-1" size="large" />
          <Heading color="dark-1" size="medium">
            Top songs playlist generator
          </Heading>
        </Box>
        <Button primary href={loginUrl} label="Login with spotify"></Button>
      </Box>
      <Footer
        className="footer"
        background="status-ok"
        width="100%"
        height="60px"
        justify="center"
      >
        <Anchor
          className="ghIcon"
          color="dark-1"
          icon={<Github size="30px" />}
          href="https://github.com/ToukoJouko/spotify-playlist-app"
        />
      </Footer>
    </div>
  );
};

export default Login;
