import React from "react";
import { Box, Button, Layer, Text } from "grommet";

const Notification = (props) => {
  return (
    <Layer onEsc={props.setShow} onClickOutside={props.setShow}>
      <Box pad="medium">
        <Text>{props.message}</Text>
        <Button
          primary
          label="close"
          pad="small"
          onClick={props.setShow}
        ></Button>
      </Box>
    </Layer>
  );
};

export default Notification;
