const express = require("express");
const { getUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/:userId", getUser);



module.exports = router;
