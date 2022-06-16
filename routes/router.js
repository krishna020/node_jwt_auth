const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');

app.get('/api', (req, res) => {
    res.json({
      message: 'Welcome to the API'
    });
  });
  
  app.post('/api/posts', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });
  
  app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
      id: 1, 
      username: 'krishna',
      email: 'krishnasahu8070@gmail.com'
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token:token
      });
    });
  });

  // FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

  

  module.exports = app;