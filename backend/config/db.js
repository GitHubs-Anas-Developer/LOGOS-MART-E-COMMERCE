const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_DB_URI;
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.".bgWhite.green);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
