const Order = require("../models/Order");

// KRIJO POROSI (anonim ose me login)
exports.create = async (req, res) => {
  try {
    const { customer, products, paymentMethod, subtotal, total } = req.body;

    // Validim bazik
    if (!customer || !products || !products.length) {
      return res.status(400).json({ error: "Të dhënat e porosisë janë të paplota" });
    }

    // Krijo porosinë
    const order = new Order({
      customer,
      products,
      paymentMethod: paymentMethod || 'para-ne-dore',
      subtotal,
      total,
      // Nëse përdoruesi është i loguar (Cognito), shto userId
      userId: req.user?.sub || null
    });

    await order.save();

    // Kthe porosinë (pa sensitiv)
    res.status(201).json({
      success: true,
      orderNumber: order.orderNumber,
      message: "Porosia u krijua me sukses"
    });

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Gabim gjatë krijimit të porosisë" });
  }
};

// LISTO TË GJITHA POROSITË (vetëm admin)
exports.list = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LISTO POROSITË E PËRDORUESIT (nëse është i loguar)
exports.listMyOrders = async (req, res) => {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({ error: "Duhet të jeni të loguar" });
    }
    const orders = await Order.find({ userId: req.user.sub }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PËRDITËSO STATUSIN (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SHIKO DETAJET E POROSISË (për klientin)
exports.getByOrderNumber = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.number });
    if (!order) {
      return res.status(404).json({ error: "Porosia nuk u gjet" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};