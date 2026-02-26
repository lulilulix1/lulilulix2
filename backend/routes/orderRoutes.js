const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");
const cognitoAuth = require("../middleware/cognitoAuth");

// User
router.post("/", cognitoAuth, orderCtrl.create);
router.get("/my", cognitoAuth, orderCtrl.listMyOrders);

// Admin
router.get("/", adminAuth, orderCtrl.list);
router.put("/:id/status", adminAuth, orderCtrl.updateStatus);

module.exports = router;
