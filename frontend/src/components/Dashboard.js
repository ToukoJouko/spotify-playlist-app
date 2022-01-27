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

  const getTopTracks = async () => {
    spotifyApi.setAccessToken(accessToken);
    const topTracksResponse = await spotifyApi.getMyTopTracks({ limit: 50 });
    setTopTracks(topTracksResponse.body.items);
    console.log(topTracks);
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
        playlistFunction1={getTopTracks}
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
