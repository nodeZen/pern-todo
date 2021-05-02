const jwt = require("jsonwebtoken");
require("dotenv").config();
const { notAuthorized } = require("../constants/messages");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(403).json({ failMessage: notAuthorized });
    }
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};
