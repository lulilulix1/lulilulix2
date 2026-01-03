const Product = require("../models/Product");
const uploadToS3 = require("../utils/s3Upload");

// CREATE PRODUCT (POST /api/products)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, supplier, description } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    const product = await Product.create({
      name,
      price,
      category,
      supplier,
      description,
      image: imageUrl
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PRODUCTS (GET /api/products)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
