const addressModel = require("../models/addressModel");

const createAddress = async (req, res) => {
  try {
    const { userId } = req.params; // userId is expected in the URL (e.g., /addresses/:userId)
    const {
      name,
      street,
      city,
      state,
      postalCode,
      country,
      apartment,
      phoneNumber,
      landmark,
    } = req.body; // Destructure address data from the body

    // Check if all required fields are present
    if (!name || !street || !city || !state || !postalCode || !country) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Create a new address object using shorthand property names
    const newAddress = new addressModel({
      userId, // Reference to the user who owns this address
      name,
      street,
      city,
      state,
      postalCode,
      country,
      apartment, // Optional field
      phoneNumber, // Optional field
      landmark, // Optional field
    });

    // Save the new address to the database
    await newAddress.save();

    // Respond with the created address
    return res
      .status(201)
      .json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error while creating address" });
  }
};
const getAddress = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the request body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch addresses associated with the given userId
    const addresses = await addressModel.find({ userId });

    if (!addresses || addresses.length === 0) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    }

    // Return the addresses
    return res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error while fetching addresses:", error);
    return res
      .status(500)
      .json({ error: "Server error while fetching addresses" });
  }
};
const updateAddress = async (req, res) => {
  console.log(req.body);

  try {
    const userId = req.user.id; // Assume authentication middleware sets `req.user`
    console.log("userId", userId);

    const {
      name,
      street,
      city,
      state,
      postalCode,
      country,
      phoneNumber,
      apartment,
      landmark,
    } = req.body;

    // Validate the input
    if (!name || !street || !city || !state || !postalCode || !country) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    // Find and update the address in the database
    const updatedAddress = await addressModel.findOneAndUpdate(
      { userId }, // Find address by ID and user ID
      {
        name,
        street,
        city,
        state,
        postalCode,
        country,
        phoneNumber,
        apartment,
        landmark,
      }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ error: "Address not found or unauthorized." });
    }

    // Respond with the updated address
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error("Error while updating address:", error);
    res.status(500).json({ error: "Server error while updating the address." });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure user ID is extracted from the request
    const { addressId } = req.body; // Assuming the address ID is sent in the request bodyd);

    // Validate payload
    if (!addressId) {
      return res.status(400).json({ error: "Address ID is required." });
    }

    // Find and delete the address
    const deletedAddress = await addressModel.findOneAndDelete({
      _id: addressId,
      userId, // Ensure the user owns the address
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ error: "Address not found or unauthorized." });
    }

    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("Error while deleting address:", error);
    res.status(500).json({ error: "Server error while deleting the address." });
  }
};

module.exports = { createAddress, getAddress, updateAddress, deleteAddress };
