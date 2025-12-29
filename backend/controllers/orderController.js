const Order = require('../models/Order');

// Create order
exports.create = async (req, res) => {
  try {
    const { customer, products, total } = req.body;
    const orderNumber = 'ORD-' + Date.now();

    const order = new Order({
      orderNumber,
      customer,
      products,
      total
    });

    const saved = await order.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List orders (admin)
exports.list = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
