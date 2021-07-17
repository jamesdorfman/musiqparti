import express from "express";
import User from "../model/user.js";
import SpotifyWebApi from "spotify-web-api-node";

const router = express.Router();

// get all display info given a spotifyId of a user
router.get("/info/:spotifyId", async (req, res) => {
  // Get spotify user id from spotify me query
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: req.cookies.refreshToken,
    accessToken: req.cookies.accessToken,
  });

  console.log(req.params);
  let { body: spotifyUser } = await spotifyApi.getUser(req.params.spotifyId);
  let { body: playlists } = await spotifyApi.getUserPlaylists(
    req.params.spotifyId
  );

  let user = await User.findOne({ spotifyId: req.params.spotifyId }).select({
    _id: 0,
    __v: 0,
  });

  res.json({ spotify: spotifyUser, playlists, user });
});

router.get("/me", async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: req.cookies.refreshToken,
    accessToken: req.cookies.accessToken,
  });

  let { body: spotify } = await spotifyApi.getMe();
  let user = await User.findOne({ spotifyId: spotify.id }).select({
    _id: 0,
    __v: 0,
  });
  let { body: playlists } = await spotifyApi.getUserPlaylists(
    req.params.spotifyId
  );

  res.json({ spotify, user, playlists });
});

// get matched users
router.get("/match", async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: req.cookies.refreshToken,
    accessToken: req.cookies.accessToken,
  });

  let users = await User.aggregate([{ $sample: { size: 5 } }]);

  console.log(users);

  let results = [];

  for (let user of users) {
    let { body: spotify } = await spotifyApi.getUser(user.spotifyId);
    let { body: playlist } = await spotifyApi.getPlaylist(user.playlistId);
    let result = { user, playlist, spotify };
    results.push(result);
  }

  res.json({ results });
});

// update main playlist
router.patch("/playlist", async (req, res) => {
  // Get spotify user id from spotify me query
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: req.cookies.refreshToken,
    accessToken: req.cookies.accessToken,
  });

  let { body } = await spotifyApi.getMe();
  let { id } = body;

  // save passed in playlist using user_id to find target, create if not found
  let result = await User.findOneAndUpdate(
    { spotifyId: id },
    { playlistId: req.body.playlistId || "" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).catch((err) => {
    console.log(err);
  });

  res.json({ id });
});

// update bio of user
router.patch("/bio", async (req, res) => {
  // Get spotify user id from spotify me query
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: req.cookies.refreshToken,
    accessToken: req.cookies.accessToken,
  });

  let { body } = await spotifyApi.getMe();
  let { id } = body;

  // save passed in bio using user_id to find target, create if not found
  await User.findOneAndUpdate(
    { spotifyId: id },
    { bio: req.body.bio || "" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json({ id });
});

// update facebook id of user
router.patch("/facebookId", async (req, res) => {
  // Get spotify user id from spotify me query
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: req.cookies.refreshToken,
    accessToken: req.cookies.accessToken,
  });

  let { body } = await spotifyApi.getMe();
  let { id } = body;

  // save passed in facebook id using user_id to find target, create if not found
  await User.findOneAndUpdate(
    { spotifyId: id },
    { facebookId: req.body.facebookId || "" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json({ id });
});

export default router;
