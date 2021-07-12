import express from "express";
import request from "request";
import SpotifyWebApi from "spotify-web-api-node";

const router = express.Router();

// test route
router.get("/hello", (req, res) => {
  if (!req.cookies.accessToken) {
    return res.json({
      hello: "world",
    });
  }

  var options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + req.cookies.accessToken },
    json: true,
  };

  // use the access token to access the Spotify Web API
  request.get(options, function (error, response, body) {
    res.json(body);
  });
});

// refresh access token path
router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.cookie("accessToken", data.body.accessToken, {
        httpOnly: true,
        sameSite: "lax",
      });
      res.cookie("expiresIn", data.body.expires_in, {
        httpOnly: true,
        sameSite: "lax",
      });
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// spotify api login
router.get("/login", (req, res) => {
  const code = req.query.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.cookie("accessToken", data.body.access_token, {
        httpOnly: true,
        sameSite: "lax",
      });
      res.cookie("refreshToken", data.body.refresh_token, {
        httpOnly: true,
        sameSite: "lax",
      });
      res.cookie("expiresIn", data.body.expires_in, {
        httpOnly: true,
        sameSite: "lax",
      });
      res.redirect(process.env.CORS_ORIGIN);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

// logout by clearing cookies
router.get("/logout", (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ status: "ok" });
});

// TODO: get logged in user profile
router.get("/me", (req, res) => {});

export default router;
