const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true, // Ensure that each address is associated with a user
  },
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  landmark: {
    type: String,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
