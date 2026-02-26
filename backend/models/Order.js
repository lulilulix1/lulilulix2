const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },

  user: {
    sub: String,     // Cognito user id
    email: String
  },

  customer: {
    emri: String,
    mbiemri: String,
    email: String,
    telefoni: String,
    adresa: String,
    qyteti: String,
    shteti: String
  },

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      supplier: String
    }
  ],

  total: Number,
  status: { type: String, default: "ne-pritje" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
