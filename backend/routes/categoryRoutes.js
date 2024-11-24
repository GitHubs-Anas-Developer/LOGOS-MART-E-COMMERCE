const express = require("express");

const router = express.Router();

const upload = require("../middleware/Multer");
const {
  createCategory,
  getAllCategory,
} = require("../controller/categoryController");
router.post("/createcategory", upload.single("image"), createCategory);
router.get("/getallcategory", getAllCategory);

module.exports = router;
