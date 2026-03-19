const Product = require("../models/Product");
const uploadToS3 = require("../utils/s3Upload");

// ==================== GET ====================
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produkti nuk u gjet" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== POST ====================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, supplier, description, stock, isOnSale, salePrice } = req.body;
    const files = req.files; // vjen nga multer

    let imageUrls = [];
    if (files && files.length > 0) {
      // Ngarko secilën foto në S3 duke përdorur funksionin e thjeshtë
      for (const file of files) {
        const url = await uploadToS3(file);
        imageUrls.push(url);
      }
    }

    const product = new Product({
      name,
      price: parseFloat(price),
      category: category || '',
      supplier: supplier || '',
      description: description || '',
      stock: parseInt(stock) || 0,
      isOnSale: isOnSale === 'true' || isOnSale === true,
      salePrice: salePrice ? parseFloat(salePrice) : null,
      images: imageUrls,
      image: imageUrls[0] || '',
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==================== PUT ====================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const files = req.files;

    if (files && files.length > 0) {
      const newImageUrls = [];
      for (const file of files) {
        const url = await uploadToS3(file);
        newImageUrls.push(url);
      }
      updates.images = newImageUrls;
      updates.image = newImageUrls[0] || '';
    }

    const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ error: "Produkti nuk u gjet" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==================== DELETE ====================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Produkti nuk u gjet" });
    res.json({ message: "Produkti u fshi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};