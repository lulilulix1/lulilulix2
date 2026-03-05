const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/ProductController");
const adminAuth = require("../middleware/adminAuth");
const { upload } = require("../utils/s3Upload");

console.log("🚦 PRODUCT ROUTES LOADING...");
console.log("📦 Imported controller functions:");
console.log("getAll:", typeof productCtrl.getAll);
console.log("getProductById:", typeof productCtrl.getProductById);
console.log("createProduct:", typeof productCtrl.createProduct);
console.log("updateProduct:", typeof productCtrl.updateProduct);
console.log("deleteProduct:", typeof productCtrl.deleteProduct);

// Routes
router.get("/", productCtrl.getAll);
router.get("/:id", productCtrl.getProductById);
router.post("/", adminAuth, upload.array('images', 5), productCtrl.createProduct);
router.put("/:id", adminAuth, upload.array('images', 5), productCtrl.updateProduct);
router.delete("/:id", adminAuth, productCtrl.deleteProduct);

console.log("✅ Routes defined");
module.exports = router;