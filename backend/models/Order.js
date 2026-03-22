const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },

  // Klienti
  customer: {
    emri: { type: String, required: true },
    mbiemri: { type: String, required: true },
    email: { type: String, required: true },
    telefoni: { type: String, required: true },
    adresa: { type: String, required: true },
    qyteti: { type: String, required: true },
    shteti: { type: String, default: "Kosovë" }
  },

  // Produktet
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      supplier: String
    }
  ],

  // Pagesa
  paymentMethod: {
    type: String,
    enum: ['para-ne-dore', 'kartele', 'crypto'],
    default: 'para-ne-dore'
  },
  paymentStatus: {
    type: String,
    enum: ['ne-pritje', 'paguar', 'dështuar'],
    default: 'ne-pritje'
  },

  // Totali
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },

  // Statusi
  status: {
    type: String,
    enum: ['ne-pritje', 'konfirmuar', 'dërguar', 'përfunduar', 'anuluar'],
    default: 'ne-pritje'
  },

  userId: { type: String, default: null },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// 🔥 GJENERIMI PARA VALIDATION
OrderSchema.pre('save', async function(next) {
  console.log("🔥🔥🔥 PRE-SAVE HOOK IS RUNNING! Order number:", this.orderNumber); // ← Shto këtë
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `ORD-${year}${month}${day}-${random}`;
    console.log("✅ Generated order number:", this.orderNumber);
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);