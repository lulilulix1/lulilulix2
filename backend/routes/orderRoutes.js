const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");
const cognitoAuth = require("../middleware/cognitoAuth");

// ==================== Rrugët publike (anonime) ====================
// Krijimi i porosisë pa login (checkout anonim)
router.post("/", orderCtrl.create);

// Shiko detajet e porosisë me numrin e porosisë (për klientin)
router.get("/track/:number", orderCtrl.getByOrderNumber);

// ==================== Rrugët për klientë të regjistruar (Cognito) ====================
// Listo porositë e klientit të loguar
router.get("/my", cognitoAuth, orderCtrl.listMyOrders);

// ==================== Rrugët për admin ====================
// Listo të gjitha porositë (admin)
router.get("/", adminAuth, orderCtrl.list);

// Përditëso statusin e porosisë (admin)
router.put("/:id/status", adminAuth, orderCtrl.updateStatus);

module.exports = router;