require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const spotifyApi = new spotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:3001/",
});

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  console.log("boom");
});

app.post("/login", async (request, response) => {
  const code = request.body.code;

  const accessToken = await spotifyApi.authorizationCodeGrant(code);
  if (accessToken) {
    response.json({ accessToken: accessToken.body.access_token });
  } else {
    response.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
