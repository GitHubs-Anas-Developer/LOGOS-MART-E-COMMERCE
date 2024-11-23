const mongoose = require("mongoose");

const subSubcategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  parentSubcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory", // assuming you have a Subcategory model
    required: true,
  },
});

module.exports = mongoose.model("SubSubcategory", subSubcategorySchema);
