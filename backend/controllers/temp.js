const Product = require("../models/Product");
const uploadToS3 = require("../utils/s3Upload");

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

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
