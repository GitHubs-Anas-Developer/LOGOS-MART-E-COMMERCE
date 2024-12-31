const express = require("express");
const {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/addressController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST route to create a new address
router.post("/new/address/:userId", createAddress); // Use :userId as a route parameter to associate the address with a user
router.get("/address/:userId", getAddress); // Use :userId as a route parameter to associate the address with a user
router.put("/update/address", authMiddleware, updateAddress); // Use :userId as a route parameter to associate the address with a user
router.delete("/delete/address", authMiddleware, deleteAddress);
module.exports = router;
