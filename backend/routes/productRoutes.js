const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductController = require("../controllers/ProductController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// TEST ROUTE (KRITIKE)
router.get("/test", (req, res) => {
  res.json({ message: "products route works" });
});

// REAL ROUTES
router.get("/", ProductController.getProducts);
router.post("/", upload.single("image"), ProductController.createProduct);

module.exports = router;
