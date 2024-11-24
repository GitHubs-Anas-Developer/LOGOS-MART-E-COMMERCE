const express = require("express");
const {
  createSubcategory,
  getAllSubcategory,
  getSubcategoriesByCategory,
} = require("../controller/subcategoryConroller");
const upload = require("../middleware/Multer");

const router = express.Router();

router.post("/subcategory/create", upload.single("image"), createSubcategory);
router.get("/subcategories/all", getAllSubcategory);
router.get("/category/subcategory/:categoryId", getSubcategoriesByCategory);

module.exports = router;
