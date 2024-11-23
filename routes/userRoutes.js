const express = require("express");
const { getUser } = require("../controller/userController");

const router = express.Router();

router.get("/user/:userId", getUser);

module.exports = router;
