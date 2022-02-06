import React, { useState, useImperativeHandle } from "react";
import {
  Text,
  Button,
  Box,
  Header,
  Paragraph,
  Select,
  Footer,
  Heading,
  Anchor,
} from "grommet";
import { Spotify, Github } from "grommet-icons";

const MainHeader = React.forwardRef((props, ref) => {
  const [limit, setLimit] = useState(5);
  const [timeRange, setTimeRange] = useState("short term");

  const headerPad = { horizontal: "medium", bottom: "small" };
  const valueSelectorPad = { bottom: "30px" };

  let limitOptions = [];

  for (let i = 5; i < 51; i++) {
    limitOptions.push(i);
  }

  useImperativeHandle(ref, () => {
    return {
      limit,
      timeRange,
    };
  });

  return (
    <div>
      <Header pad={headerPad} background="status-ok" direction="row-responsive">
        <Box direction="row" align="center" justify="center" gap="small">
          <Spotify color="dark-1" size="large" />
          <Heading size="medium">Top songs playlist generator</Heading>
        </Box>
        <Box direction="column" gap="small">
          <Text alignSelf="center">logged in as {props.username}</Text>
          <Button
            href={props.spotifyLink}
            label="Open spotify"
            fill="vertical"
            alignSelf="center"
            color="dark-1"
          />
          <Button
            label="logout"
            fill="vertical"
            alignSelf="center"
            color="dark-1"
            onClick={props.logOut}
          ></Button>
        </Box>
      </Header>
      <Box direction="column" justify="center" gap="small">
        <Box
          direction="row-responsive"
          justify="center"
          gap="medium"
          pad="small"
        >
          <Box margin="small">
            <Paragraph>
              Choose length of the playlist and timeframe, then press the create
              playlist-button and your playlist will be created. The created
              playlist will contain your most played songs based on the chosen
              timeframe.
            </Paragraph>
            <Paragraph>
              Length of the playlist: The amount of songs the created playlist
              will contain
            </Paragraph>
            <Paragraph>
              Timeframe:
              <br />
              short term = data from the last month
              <br />
              medium term = data form the last 6 months
              <br />
              long term = calculated from several years of data, including all
              new data as it becomes available
            </Paragraph>
          </Box>
          <Box justify="end" pad={valueSelectorPad}>
            <Box direction="column" justify="center" gap="large">
              <Box direction="row-responsive" justify="end" align="center">
                <Text>Length of playlist: </Text>
                <Select
                  options={limitOptions}
                  value={limit}
                  onChange={({ option }) => setLimit(option)}
                />
              </Box>
              <Box direction="row-responsive" justify="end" align="center">
                <Text>Timeframe: </Text>
                <Select
                  options={["short term", "medium term", "long term"]}
                  value={timeRange}
                  onChange={({ option }) => setTimeRange(option)}
                />
              </Box>
              <Button
                primary
                label="Create playlist"
                onClick={props.playlistFunction1}
              ></Button>
            </Box>
          </Box>
        </Box>
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
});

export default MainHeader;
