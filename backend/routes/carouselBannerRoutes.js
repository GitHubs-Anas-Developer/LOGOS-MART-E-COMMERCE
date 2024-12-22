const express = require("express");
const {
  createCarouselBanner,
  getAllCarouselBanners,
} = require("../controller/CarouselBanner");

const router = express.Router();

const upload = require("../middleware/Multer");

router.post(
  "/create/carouselBanner",
  upload.array("images", 10),
  createCarouselBanner
);
router.get("/carouselBanners", getAllCarouselBanners);

module.exports = router;
