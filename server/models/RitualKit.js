const mongoose = require('mongoose');

const ritualKitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Pre-Wedding', 'Wedding', 'Post-Wedding', 'Regional']
  },
  description: {
    type: String,
    required: true
  },
  items: [{
    name: String,
    quantity: Number,
    isCustomizable: Boolean
  }],
  basePrice: {
    type: Number,
    required: true
  },
  images: [String],
  customizationOptions: [{
    name: String,
    choices: [String],
    additionalCost: Number
  }],
  region: String,
  isPopular: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RitualKit', ritualKitSchema);
