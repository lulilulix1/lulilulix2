const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductController = require("../controllers/ProductController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET products
router.get("/", ProductController.getProducts);

// CREATE product
router.post("/", upload.single("image"), ProductController.createProduct);

module.exports = router;
