import React, { useEffect } from "react";
import useAuth from "../useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "67c66cd2a61748088c5f1ac7cc9e76f4",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    const getUserData = async () => {
      const response = await spotifyApi.getMe();
      console.log(response);
    };

    getUserData();
  }, [accessToken]);

  return <div>{code}</div>;
};

export default Dashboard;
