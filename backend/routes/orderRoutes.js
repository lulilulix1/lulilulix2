const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");
const cognitoAuth = require("../middleware/cognitoAuth");

// Routes publike (anonime)
router.post("/", orderCtrl.create);  // 👈 ANONIME! Pa cognitoAuth
router.get("/track/:number", orderCtrl.getByOrderNumber);

// Routes për përdorues të loguar
router.get("/my", cognitoAuth, orderCtrl.listMyOrders);

// Routes për admin
router.get("/", adminAuth, orderCtrl.list);
router.put("/:id/status", adminAuth, orderCtrl.updateStatus);

module.exports = router;