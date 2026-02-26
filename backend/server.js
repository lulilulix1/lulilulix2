const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();  // ← APP DUHET DEKLARUAR FILLIMISHT

// Middleware për të loguar çdo kërkesë (TANI PAS APP)
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running");
});

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);  // ← KJO TANI BRENDA

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