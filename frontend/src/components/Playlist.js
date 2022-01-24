import React from "react";
import { Card, Text, Button } from "grommet";

const Playlist = (props) => {
  return (
    <div>
      <Card
        direction="row"
        pad="small"
        margin="small"
        background="status-ok"
        width="xlarge"
      >
        <Text background="status-ok">{props.name}</Text>
        <Button secondary label="delete" color="red"></Button>
      </Card>
    </div>
  );
};

export default Playlist;
