const Product = require("../models/Product");

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

    // 🔥 MULTER-S3 already uploads images
    const imageUrls = req.files && req.files.length > 0
      ? req.files.map(file => file.location)
      : [];

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

    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => file.location);
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