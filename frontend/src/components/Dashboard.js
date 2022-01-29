import React, { useState, useEffect } from "react";
import { Button } from "grommet";
import Playlist from "./Playlist";
import MainHeader from "./MainHeader";
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

    getTopTracks(50, "short_term");
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
    const topTracksResponse = await spotifyApi.getMyTopTracks({
      limit: limit,
      time_range: time_range,
    });
    //get track id's
    setTopTracks(topTracksResponse.body.items.map((track) => track.uri));
  };

  const createTopTracksPlaylist = async (event) => {
    event.preventDefault();
    spotifyApi.setAccessToken(accessToken);
    //get top tracks
    const limit = 50;
    const time_range = "short_term";
    const topTracksResponse = await spotifyApi.getMyTopTracks({
      limit: limit,
      time_range: time_range,
    });
    //get track id's
    setTopTracks(topTracksResponse.body.items.map((track) => track.uri));
    console.log(topTracks);

    //create new playlist
    await spotifyApi.createPlaylist(`Top ${limit} songs`, {
      description: `Top ${limit} songs`,
      public: true,
    });

    //get playlists
    const responsePlaylists = await spotifyApi.getUserPlaylists(
      userData.display_name
    );
    //add tracks to target playlist
    const targetPlaylist = responsePlaylists.body.items[0].id;
    await spotifyApi.addTracksToPlaylist(targetPlaylist, topTracks);
    setShowPlaylist(responsePlaylists.body.items);
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
        playlistFunction1={createTopTracksPlaylist}
      />
      {showPlaylist ? (
        <ul>
          {playlists.items.map((playlist, index) => (
            <Playlist key={index} name={playlist.name} />
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
