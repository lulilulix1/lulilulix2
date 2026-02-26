const Product = require("../models/Product");
const uploadToS3 = require("../utils/s3Upload");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {

    console.log("CONTENT-TYPE:", req.headers["content-type"]);
    console.log("REQ FILE:", req.file);
    console.log("REQ BODY:", req.body);

    const { name, price, category, supplier, description } = req.body;

    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    console.log("IMAGE URL:", imageUrl);

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
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
