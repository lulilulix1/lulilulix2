const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ← Shto këtë

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES - TË GJITHA PARA MONGODB
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // ← LËVIZUR KËTU (para mongoose)

// HEALTH CHECK - I RI
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
    console.error(err);
  });