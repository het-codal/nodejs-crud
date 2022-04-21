const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).json("Unauthorized");
    const secret = process.env.secret;
    const decoded = jwt.verify(token, secret);
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = { ...decoded.user };
    next();
  } catch (e) {
    res.status(400).json("Token not valid");
  }
}

module.exports = verifyJWT;
