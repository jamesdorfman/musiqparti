import express from "express";
import { generateRandomString } from "../util/util.js";
import request from "request";
import querystring from "querystring";

const router = express.Router();

var stateKey = "spotify_auth_state";

// test route
router.get("/hello", (req, res) => {
  if (!req.cookies.access_token) {
    return res.json({
      hello: "world",
    });
  }

  var options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + req.cookies.access_token },
    json: true,
  };

  // use the access token to access the Spotify Web API
  request.get(options, function (error, response, body) {
    res.json(body);
  });
});

// spotify api login
router.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      })
  );
});

// logout by clearing cookies
router.get("/logout", (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.cookie("refresh_token", "", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ status: "ok" });
});

// TODO: get logged in user profile
router.get("/me", (req, res) => {});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      process.env.CORS_ORIGIN +
        "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.cookie("access_token", access_token, {
          httpOnly: true,
          sameSite: "lax",
        });
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          sameSite: "lax",
        });
        res.redirect(process.env.CORS_ORIGIN);
      } else {
        res.redirect(
          process.env.CORS_ORIGIN +
            "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

router.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

export default router;
