const express = require('express');
const router = express.Router();

// Sample checklist templates
const checklistTemplates = {
  standard: [
    { title: 'Book Wedding Venue', category: 'Venue', priority: 'High', daysBeforeWedding: 180 },
    { title: 'Hire Wedding Planner', category: 'Other', priority: 'High', daysBeforeWedding: 180 },
    { title: 'Select Catering Service', category: 'Catering', priority: 'High', daysBeforeWedding: 150 },
    { title: 'Book Photographer & Videographer', category: 'Photography', priority: 'High', daysBeforeWedding: 120 },
    { title: 'Choose Wedding Attire', category: 'Attire', priority: 'High', daysBeforeWedding: 120 },
    { title: 'Send Save-the-Date Cards', category: 'Guests', priority: 'Medium', daysBeforeWedding: 90 },
    { title: 'Book Mehendi Artist', category: 'Rituals', priority: 'Medium', daysBeforeWedding: 60 },
    { title: 'Arrange Accommodation for Guests', category: 'Guests', priority: 'High', daysBeforeWedding: 60 },
    { title: 'Plan Sangeet Ceremony', category: 'Rituals', priority: 'Medium', daysBeforeWedding: 45 },
    { title: 'Order Wedding Invitations', category: 'Guests', priority: 'High', daysBeforeWedding: 45 },
    { title: 'Book Makeup Artist', category: 'Attire', priority: 'High', daysBeforeWedding: 30 },
    { title: 'Finalize Decoration Theme', category: 'Decoration', priority: 'Medium', daysBeforeWedding: 30 },
    { title: 'Purchase Ritual Items', category: 'Rituals', priority: 'High', daysBeforeWedding: 21 },
    { title: 'Confirm Final Guest Count', category: 'Guests', priority: 'High', daysBeforeWedding: 14 },
    { title: 'Arrange Transportation', category: 'Other', priority: 'Medium', daysBeforeWedding: 14 },
    { title: 'Conduct Haldi Ceremony', category: 'Rituals', priority: 'High', daysBeforeWedding: 2 },
    { title: 'Final Venue Walkthrough', category: 'Venue', priority: 'High', daysBeforeWedding: 1 }
  ]
};

// GET checklist template
router.get('/template', (req, res) => {
  const { type = 'standard' } = req.query;
  res.json(checklistTemplates[type] || checklistTemplates.standard);
});

// POST create personalized checklist
router.post('/create', (req, res) => {
  const { weddingDate, brideName, groomName, isB2B } = req.body;
  
  const weddingDateObj = new Date(weddingDate);
  const items = checklistTemplates.standard.map(item => {
    const dueDate = new Date(weddingDateObj);
    dueDate.setDate(dueDate.getDate() - item.daysBeforeWedding);
    
    return {
      ...item,
      dueDate: dueDate.toISOString(),
      isCompleted: false,
      description: `Complete this task ${item.daysBeforeWedding} days before wedding`
    };
  });

  const checklist = {
    id: Date.now().toString(),
    weddingDate,
    brideName,
    groomName,
    isB2B: isB2B || false,
    items,
    createdAt: new Date().toISOString()
  };

  res.json(checklist);
});

// PUT update checklist item
router.put('/:checklistId/items/:itemId', (req, res) => {
  const { isCompleted, notes } = req.body;
  
  res.json({
    message: 'Checklist item updated successfully',
    itemId: req.params.itemId,
    isCompleted,
    notes
  });
});

// POST add custom item to checklist
router.post('/:checklistId/items', (req, res) => {
  const { title, category, priority, dueDate, description } = req.body;
  
  const newItem = {
    id: Date.now().toString(),
    title,
    category,
    priority,
    dueDate,
    description,
    isCompleted: false,
    createdAt: new Date().toISOString()
  };

  res.json(newItem);
});

module.exports = router;
