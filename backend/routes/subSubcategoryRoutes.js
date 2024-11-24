const express = require("express");
const {
  createSubSubcategory,
  getAllSubSubctegory,
  getSubsubcategoriesBySubcategory,
} = require("../controller/subSubcategoryController");
const upload = require("../middleware/Multer");

const router = express.Router();

router.post(
  "/subcategory/sub/create",
  upload.single("image"),
  createSubSubcategory
);
router.get("/categories/subcategories/sub/all", getAllSubSubctegory);
router.get("/subcategory/:subcategoryId", getSubsubcategoriesBySubcategory);

module.exports = router;
