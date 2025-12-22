const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // verify user

  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ msg: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET); // returned: what was signed into the token
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Not Authorized" });
  }
}

module.exports = auth;
