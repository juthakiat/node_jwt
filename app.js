const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secret-key",

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the APIs"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, data) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created.",
        data
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "juthakiat",
    email: "juthakait@gmail.com"
  }

  jwt.sign({ user }, secretKey, { expiresIn: "60s" }, (err, token) => {
    res.json({
      token
    });
  });
});

// Token format
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (bearerHeader) {
    // Split at the space
    const bearer = bearerHeader.split(" ");
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

app.listen(4000, () => console.log("Server started on port 4000"));