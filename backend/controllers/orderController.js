const Order = require("../models/Order");
const sendTelegram = require("../utils/telegramService");

// KRIJO POROSI (anonim ose me login)
exports.create = async (req, res) => {
  try {
    console.log("📥 REQ BODY:", JSON.stringify(req.body, null, 2));

    const { customer, products, paymentMethod, subtotal, total } = req.body;

    // Validim bazik
    if (!customer || !products || !products.length) {
      console.log("❌ VALIDATION FAILED");
      return res.status(400).json({ error: "Të dhënat e porosisë janë të paplota" });
    }

    console.log("✅ Validation OK");

    // Krijo porosinë
    const order = new Order({
      customer,
      products,
      paymentMethod: paymentMethod || "para-ne-dore",
      subtotal,
      total,
      userId: req.user?.sub || null
    });

    console.log("🛠️ Order object created:", order);

    // SAVE në MongoDB
    const savedOrder = await order.save();

    console.log("✅ ORDER SAVED:", savedOrder);

    // ===== TELEGRAM (AKTIVIZUAR) =====
    try {
      const productList = products
        .map(p => `${p.name} x${p.quantity}`)
        .join("\n");

      const message = `
🛒 POROSI E RE

Nr: ${savedOrder.orderNumber}

👤 ${customer.emri} ${customer.mbiemri}
📞 ${customer.telefoni}
📍 ${customer.qyteti}

📦 Produkte:
${productList}

💰 Totali: €${total}
`;

      await sendTelegram(message);
      console.log("✅ Telegram notification sent for order:", savedOrder.orderNumber);
    } catch (telegramError) {
      console.error("❌ Telegram notification failed:", telegramError.message);
      // Nuk e ndalojmë procesin nëse Telegram dështon
    }
    // ===== END TELEGRAM =====

    // Response
    res.status(201).json({
      success: true,
      orderNumber: savedOrder.orderNumber,
      message: "Porosia u krijua me sukses"
    });

  } catch (err) {
    console.error("🔥 ERROR FULL:");
    console.error(err);
    console.error("📍 ERROR MESSAGE:", err.message);
    console.error("📍 STACK:", err.stack);

    res.status(500).json({
      error: "Gabim gjatë krijimit të porosisë",
      details: err.message
    });
  }
};

// LISTO TË GJITHA POROSITË (vetëm admin)
exports.list = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("🔥 LIST ERROR:", err);
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
    console.error("🔥 MY ORDERS ERROR:", err);
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

    if (!order) {
      return res.status(404).json({ error: "Porosia nuk u gjet" });
    }

    res.json(order);

  } catch (err) {
    console.error("🔥 UPDATE ERROR:", err);
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
    console.error("🔥 GET ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};