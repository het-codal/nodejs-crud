const expressJwt = require("express-jwt");
require("dotenv/config");

function jwt() {
  const secret = process.env.secret;
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/api/login",
      "/api/signup",
    ],
  });
}

module.exports = jwt;
