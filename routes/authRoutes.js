const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");

const router = express.Router();

router.post("/create/user", createUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

module.exports = router;
