const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const subSubcategoryRoutes = require("./routes/subSubcategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const offerRoutes = require("./routes/offerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const filterRoutes = require("./routes/filterRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");

dotenv.config();

const app = express();

connectDB();

// Use the cors middleware correctly by calling it as a function
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
  })
);



// Use express.json() middleware for parsing JSON requests
app.use(express.json());

// Use body-parser for URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve static files from uploads directory
app.use("/uploads", express.static("public/uploads"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth", userRoutes);

app.use("/api/v1", categoryRoutes); // Route for categories
app.use("/api/v1", subcategoryRoutes);
app.use("/api/v1", subSubcategoryRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", offerRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1/", favoriteRoutes);
app.use("/api/v1/", filterRoutes);
app.use("/api/v1/", addressRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", reviewRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
