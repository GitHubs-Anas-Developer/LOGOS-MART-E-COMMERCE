const express = require("express");
const {
  createAddress,
  getAddress,
} = require("../controller/addressController");

const router = express.Router();

// POST route to create a new address
router.post("/new/address/:userId", createAddress); // Use :userId as a route parameter to associate the address with a user
router.get("/address/:userId", getAddress); // Use :userId as a route parameter to associate the address with a user

module.exports = router;
