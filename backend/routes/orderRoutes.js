const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const adminAuth = require('../middleware/adminAuth');

router.post('/', orderCtrl.create);

// Admin routes
router.get('/', adminAuth, orderCtrl.list);
router.put('/:id/status', adminAuth, orderCtrl.updateStatus);

module.exports = router;
