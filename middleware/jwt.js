const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Invalid token." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
