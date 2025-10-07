const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Razorpay configuration (use environment variables in production)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_key';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret';

// POST create order
router.post('/create-order', (req, res) => {
  const { amount, currency = 'INR', receipt, notes } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  // In production, integrate with actual Razorpay SDK
  const order = {
    id: `order_${Date.now()}`,
    entity: 'order',
    amount: amount * 100, // Amount in paise
    currency,
    receipt: receipt || `receipt_${Date.now()}`,
    status: 'created',
    notes: notes || {},
    created_at: Math.floor(Date.now() / 1000)
  };

  res.json({
    order,
    key: RAZORPAY_KEY_ID,
    message: 'Order created successfully'
  });
});

// POST verify payment signature
router.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required payment parameters' });
  }

  // Verify signature
  const text = razorpay_order_id + '|' + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');

  const isValid = generated_signature === razorpay_signature;

  if (isValid) {
    // In production, update order status in database
    res.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
});

// GET payment details
router.get('/payment/:paymentId', (req, res) => {
  const { paymentId } = req.params;

  // In production, fetch from Razorpay API
  const payment = {
    id: paymentId,
    entity: 'payment',
    status: 'captured',
    method: 'card',
    amount: 500000, // in paise
    currency: 'INR',
    created_at: Math.floor(Date.now() / 1000)
  };

  res.json(payment);
});

// POST refund payment
router.post('/refund', (req, res) => {
  const { paymentId, amount, notes } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: 'Payment ID is required' });
  }

  // In production, process refund through Razorpay API
  const refund = {
    id: `rfnd_${Date.now()}`,
    entity: 'refund',
    payment_id: paymentId,
    amount: amount || 'full',
    currency: 'INR',
    status: 'processed',
    notes: notes || {},
    created_at: Math.floor(Date.now() / 1000)
  };

  res.json({
    success: true,
    refund,
    message: 'Refund processed successfully'
  });
});

// GET supported payment methods
router.get('/methods', (req, res) => {
  res.json({
    methods: [
      { id: 'card', name: 'Credit/Debit Card', enabled: true, icon: '💳' },
      { id: 'upi', name: 'UPI', enabled: true, icon: '📱' },
      { id: 'netbanking', name: 'Net Banking', enabled: true, icon: '🏦' },
      { id: 'wallet', name: 'Digital Wallets', enabled: true, icon: '👛' },
      { id: 'emi', name: 'EMI', enabled: true, icon: '💰' }
    ],
    currency: 'INR',
    minAmount: 100,
    maxAmount: 10000000
  });
});

// POST calculate EMI
router.post('/calculate-emi', (req, res) => {
  const { amount, tenure } = req.body; // tenure in months

  if (!amount || !tenure) {
    return res.status(400).json({ error: 'Amount and tenure are required' });
  }

  // Typical interest rates for wedding loans in India
  const interestRates = {
    3: 12,
    6: 13,
    9: 14,
    12: 15,
    18: 16,
    24: 17
  };

  const rate = interestRates[tenure] || 15;
  const monthlyRate = rate / 12 / 100;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
               (Math.pow(1 + monthlyRate, tenure) - 1);

  res.json({
    amount,
    tenure,
    interestRate: rate,
    emi: Math.round(emi),
    totalPayable: Math.round(emi * tenure),
    totalInterest: Math.round((emi * tenure) - amount),
    currency: 'INR'
  });
});

module.exports = router;
