const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  dueDate: Date,
  isCompleted: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['Venue', 'Catering', 'Decoration', 'Photography', 'Attire', 'Rituals', 'Guests', 'Other']
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  assignedTo: String,
  notes: String
});

const checklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weddingDate: Date,
  brideName: String,
  groomName: String,
  items: [checklistItemSchema],
  isB2B: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Checklist', checklistSchema);
