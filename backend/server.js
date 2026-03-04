const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// CORS i konfiguruar
app.use(cors({
  origin: ['https://orendion.com', 'https://www.orendion.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });