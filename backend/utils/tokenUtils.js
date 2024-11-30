const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "15d",
  });
  return token;
};

module.exports = generateToken;
