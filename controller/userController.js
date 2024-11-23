const userModel = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Exclude the password field in the projection
    const user = await userModel.findOne({ _id: userId }, "-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    return res.status(200).json({
      message: "User retrieved successfully", // More meaningful message
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUser,
};
