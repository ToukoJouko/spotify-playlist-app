import React, { useState, useEffect, useRef } from "react";
import { Box } from "grommet";
import Playlist from "./Playlist";
import MainHeader from "./MainHeader";
import Notification from "./Notification";
import useAuth from "../useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "67c66cd2a61748088c5f1ac7cc9e76f4",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [userData, setUserData] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const selectedValuesRef = useRef();

  const date = new Date();
  const today =
    date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  /*
  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem("loggedUserToken");
    if (loggedUserToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, []);
  */

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    const getUserData = async () => {
      const response = await spotifyApi.getMe();
      console.log(response);
      setUserData(response.body);
      window.localStorage.setItem("loggedUserToken", accessToken);
      const responsePlaylists = await spotifyApi.getUserPlaylists(
        userData.display_name
      );
      setPlaylists(responsePlaylists.body);
      console.log(responsePlaylists.body);
      setShowPlaylist(true);
    };

    getTopTracks(
      selectedValuesRef.current.limit,
      selectedValuesRef.current.timeRange.replace(" ", "_")
    );
    getUserData();
  }, [accessToken]);

  /*
  useEffect(() => {
    const getPlaylists = async () => {
      const response = await spotifyApi.getUserPlaylists(userData.display_name);
      setPlaylists(response.body);
      console.log(response.body);
    };

    getPlaylists();
    setShowPlaylist(true);
  }, [userData.display_name]);
*/
  const getTopTracks = async (limit, time_range) => {
    try {
      const topTracksResponse = await spotifyApi.getMyTopTracks({
        limit: limit,
        time_range: time_range,
      });
      //get track id's
      setTopTracks(
        topTracksResponse.body.items.map((track) => track.uri),
        getTopTracks(
          selectedValuesRef.current.limit,
          selectedValuesRef.current.timeRange.replace(" ", "_")
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTopTracksPlaylist = async (event) => {
    event.preventDefault();
    try {
      spotifyApi.setAccessToken(accessToken);
      //get top tracks
      const limit = selectedValuesRef.current.limit;
      const time_range = selectedValuesRef.current.timeRange.replace(" ", "_");
      const topTracksResponse = await spotifyApi.getMyTopTracks({
        limit: limit,
        time_range: time_range,
      });
      //get track id's
      setTopTracks(topTracksResponse.body.items.map((track) => track.uri));
      console.log(topTracks);

      //create new playlist
      await spotifyApi.createPlaylist(`Top ${limit} songs, ${today}`, {
        description: `Your top ${limit} songs from the following time period: ${selectedValuesRef.current.timeRange}.`,
        public: true,
      });

      //get playlists
      const responsePlaylists = await spotifyApi.getUserPlaylists(
        userData.display_name
      );
      //add tracks to target playlist
      const targetPlaylist = responsePlaylists.body.items[0].id;
      await spotifyApi.addTracksToPlaylist(targetPlaylist, topTracks);
      //setShowPlaylist(responsePlaylists.body.items);
      setShowNotification(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = (event) => {
    event.preventDefault();
    window.location = "/";
    //spotifyApi.resetAccessToken();
    window.localStorage.clear();
  };

  return (
    <div>
      <MainHeader
        username={userData.display_name}
        logOut={logOut}
        spotifyLink={`https://open.spotify.com/user/${userData.display_name}`}
        playlistFunction1={createTopTracksPlaylist}
        ref={selectedValuesRef}
      />
      <Box>
        {showNotification && (
          <Notification
            message={"Playlist was created succesfully!"}
            setShow={() => setShowNotification(false)}
          />
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
