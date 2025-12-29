const express = require("express");
const router = express.Router();
const multer = require("multer");

const { createProduct } = require("../controllers/ProductController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// kjo është rruga e saktë
router.post("/", upload.single("image"), createProduct);

module.exports = router;
