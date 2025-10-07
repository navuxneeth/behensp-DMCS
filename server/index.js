const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Database connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    } else {
      console.log('MongoDB URI not configured, running without database');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Routes
const ritualKitsRoutes = require('./routes/ritualKits');
const checklistRoutes = require('./routes/checklist');
const rentalRoutes = require('./routes/rental');
const calculatorRoutes = require('./routes/calculator');
const chatbotRoutes = require('./routes/chatbot');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');

app.use('/api/ritual-kits', ritualKitsRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/rental', rentalRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Wedding Logistics Platform API is running' });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
};

startServer();

module.exports = app;
