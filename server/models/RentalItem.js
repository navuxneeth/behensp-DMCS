const mongoose = require('mongoose');

const rentalItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bridal Wear', 'Groom Wear', 'Jewelry', 'Accessories', 'Decor Items']
  },
  subcategory: String,
  description: {
    type: String,
    required: true
  },
  dailyRentalPrice: {
    type: Number,
    required: true
  },
  securityDeposit: {
    type: Number,
    required: true
  },
  images: [String],
  sizes: [String],
  colors: [String],
  availability: {
    type: Boolean,
    default: true
  },
  bookedDates: [{
    startDate: Date,
    endDate: Date
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  features: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('RentalItem', rentalItemSchema);
