const express = require("express");
const router = express.Router();
const multer = require("multer");

// THJESHTË - Provo të dyja
let ProductController;
try {
  // Së pari provo pa .js (për lokal)
  ProductController = require("../controllers/ProductController");
} catch (err) {
  console.log("First try failed, trying with .js");
  try {
    // Pastaj provo me .js (për disa servere)
    ProductController = require("../controllers/ProductController.js");
  } catch (err2) {
    console.log("Both failed, using fallback");
    ProductController = {
      createProduct: (req, res) => res.json({ 
        success: true, 
        message: "Fallback controller" 
      })
    };
  }
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), ProductController.createProduct);

module.exports = router;