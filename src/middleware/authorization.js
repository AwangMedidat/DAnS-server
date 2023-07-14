const jwt = require("jsonwebtoken");


const authorization = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ Status: "Error", data: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error", data: "Token is incorrect" });
      } else {
        req.id = decoded.id;
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = authorization;
