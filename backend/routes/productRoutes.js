const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/ProductController");
const adminAuth = require("../middleware/adminAuth");
const { upload } = require("../utils/s3Upload"); // ← IMPORT I SAKTË NGA S3UPLOAD

// Routes
router.get("/", productCtrl.getAll);
router.get("/:id", productCtrl.getProductById);
router.post("/", adminAuth, upload.array('images', 5), productCtrl.createProduct);
router.put("/:id", adminAuth, upload.array('images', 5), productCtrl.updateProduct);
router.delete("/:id", adminAuth, productCtrl.deleteProduct);

module.exports = router;