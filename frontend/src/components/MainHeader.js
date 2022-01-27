import React from "react";
import { Button, Box, Header } from "grommet";

const MainHeader = (props) => {
  return (
    <Box direction="column">
      <Box direction="row" justify="center" border="true">
        <h1>logged in as {props.username}</h1>
        <Button
          label="logout"
          fill="vertical"
          alignSelf="center"
          color="status-ok"
          onClick={props.logOut}
        ></Button>
      </Box>
      <Box direction="column" border="true">
        <Header justify="center">
          <h2>Use these buttons to create playlists:</h2>
        </Header>
        <Box direction="row" justify="center">
          <Button
            label="boom babyy"
            color="status-ok"
            onClick={props.playlistFunction1}
          ></Button>
          <Button
            label="boom babyy"
            color="status-ok"
            onClick={props.playlistFunction2}
          ></Button>
          <Button
            label="boom babyy"
            color="status-ok"
            onClick={props.playlistFunction3}
          ></Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainHeader;
