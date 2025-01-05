const express = require("express");
const {
  OfferProducts,
  fetchBigDeals,
} = require("../controller/offerController");

const router = express.Router();

router.get("/offer/products", OfferProducts);
router.get("/big-deals/products", fetchBigDeals);

module.exports = router;
