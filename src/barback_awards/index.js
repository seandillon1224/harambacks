const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies, 'here');
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.barback(
    { where: { id: req.userId } },
    '{ id, email, name }'
  );

  req.user = user;
  next();
});

server.express.use(express.static(path.join(__dirname, 'build')));

server.express.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.PORT || process.env.FRONTEND_URL || 3000,
    },
  },
  deets => {
    console.log(`Server running on port https://${deets.port}`);
  }
);
