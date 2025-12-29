require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI mungon në .env');
  process.exit(1);
}
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('✅ MongoDB connected'))
  .catch(err=>{ console.error('MongoDB connect error:', err); process.exit(1); });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health-check
app.get('/', (req,res) => res.send({ ok: true, message: 'Orendion Backend' }));

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`🚀 Server running on port ${port}`));
