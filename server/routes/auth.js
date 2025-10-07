const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// POST register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone, accountType, companyName } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // In production, save to database and hash password
    const user = {
      id: Date.now().toString(),
      email,
      name,
      phone,
      accountType: accountType || 'B2C',
      companyName,
      createdAt: new Date().toISOString()
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, accountType: user.accountType },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        accountType: user.accountType
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // In production, verify against database
    const user = {
      id: '12345',
      email,
      name: 'Demo User',
      accountType: 'B2C'
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, accountType: user.accountType },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        accountType: user.accountType
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// GET verify token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      valid: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        accountType: decoded.accountType
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

// POST request password reset
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // In production, send password reset email
  res.json({
    success: true,
    message: 'Password reset link sent to your email'
  });
});

// POST reset password
router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  // In production, verify token and update password
  res.json({
    success: true,
    message: 'Password reset successful'
  });
});

module.exports = router;
