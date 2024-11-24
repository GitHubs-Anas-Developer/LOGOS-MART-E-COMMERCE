const express = require("express");
const { OfferProducts } = require("../controller/offerController");

const router = express.Router();

router.get("/offer/products", OfferProducts);

module.exports = router;
