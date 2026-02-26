const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: String,
    supplier: String,
    description: String,

    // KJO MUNGONTE
    image: {
      type: String, // URL e plotë nga S3
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
