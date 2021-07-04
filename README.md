# Team K - MusiqParti (extremely tentative name)

This is a project that is part of the S21 UWaterloo CSC x DSC Project Program!

## Overview

This is a website which will help YOU find new music and friends.

Upcoming features:

- [ ] Login with spotify auth
- [ ] Users can upload playlists
- [ ] Spotify API integration
- [ ] Model / algorithm to find similar users based on playlists and music tastes

Bonus:

- [ ] Put a status in your bio / profile
- [ ] A way to send recommendations to other users

### Members

Mentor:

- James Dorfman

Mentees:

- Mark Baula
- Rickson Yang
- Julianne Jorda
- Anna Wang

## About the Project

...Specific details on the project. Add some pictures/videos too!

## Setup
```bash
git clone https://github.com/jamesdorfman/musiqparti
cd musiqparti
cd server && npm i
cd ..
cd client && npm i
```

## Running the app for development
Both client and server will need to be started up separately.

server
```bash
cd server && npm run dev 
```

client
```bash
cd client && npm run dev
```

## Environmental variables (do not commit these!)
Corresponding .env files are required in the server directory. Environmental variables are required for the application to work locally (request them from team if needed).

`server/.env`
```
DATABASE_URI=<MongoDB connection url>
PORT=<port for server to listen on>
CORS_ORIGIN=<url of client, allow API calls from client>
CLIENT_ID=<spotify app id>
CLIENT_SECRET=<spotify app secret>
REDIRECT_URI=<express server public callback endpoint>
```