const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_DB_URI;

    if (!dbURI) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 20000, // Increases connection timeout to 20 seconds
      serverSelectionTimeoutMS: 20000, // Time to attempt server selection
    });

    console.log("MongoDB connected successfully.".bgWhite.green);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`.bgRed.white);

    // Provide more insights if the error persists
    if (error.name === "MongoNetworkError") {
      console.error(
        "Network error detected. Check if the database is reachable."
      );
    } else if (error.name === "MongoServerSelectionError") {
      console.error(
        "Unable to connect to MongoDB server. Check URI and server availability."
      );
    }

    process.exit(1); // Exits the application to avoid running in a broken state
  }
};

module.exports = connectDB;
