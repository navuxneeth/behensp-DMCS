const express = require('express');
const router = express.Router();

// Sample ritual kits data (in production, this would come from database)
const sampleRitualKits = [
  {
    id: '1',
    name: 'Haldi Ceremony Kit',
    category: 'Pre-Wedding',
    description: 'Complete kit for traditional Haldi ceremony with turmeric paste, flowers, and ceremonial items',
    items: [
      { name: 'Turmeric Paste', quantity: 2, isCustomizable: true },
      { name: 'Marigold Flowers', quantity: 5, isCustomizable: true },
      { name: 'Rose Petals', quantity: 3, isCustomizable: true },
      { name: 'Sacred Thread', quantity: 1, isCustomizable: false },
      { name: 'Brass Plates', quantity: 4, isCustomizable: true }
    ],
    basePrice: 5000,
    images: ['/images/haldi-kit.jpg'],
    customizationOptions: [
      { name: 'Flower Type', choices: ['Marigold', 'Rose', 'Mixed'], additionalCost: 0 },
      { name: 'Quantity Level', choices: ['Standard', 'Premium'], additionalCost: 2000 }
    ],
    isPopular: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: '2',
    name: 'Mehendi Ceremony Kit',
    category: 'Pre-Wedding',
    description: 'Traditional mehendi ceremony essentials with henna cones and decorative items',
    items: [
      { name: 'Henna Cones', quantity: 10, isCustomizable: true },
      { name: 'Decorative Trays', quantity: 2, isCustomizable: false },
      { name: 'Cushions', quantity: 6, isCustomizable: true },
      { name: 'Fairy Lights', quantity: 1, isCustomizable: false }
    ],
    basePrice: 4500,
    images: ['/images/mehendi-kit.jpg'],
    customizationOptions: [
      { name: 'Cushion Color', choices: ['Red', 'Gold', 'Mixed'], additionalCost: 0 },
      { name: 'Extra Henna Cones', choices: ['5', '10', '15'], additionalCost: 500 }
    ],
    isPopular: true,
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: '3',
    name: 'Saptapadi Wedding Kit',
    category: 'Wedding',
    description: 'Sacred items for the seven steps ritual of Hindu wedding ceremony',
    items: [
      { name: 'Sacred Fire Pit', quantity: 1, isCustomizable: false },
      { name: 'Ghee', quantity: 1, isCustomizable: true },
      { name: 'Samagri (Sacred Items)', quantity: 1, isCustomizable: false },
      { name: 'Ceremonial Cloth', quantity: 2, isCustomizable: true },
      { name: 'Coconuts', quantity: 7, isCustomizable: false }
    ],
    basePrice: 8000,
    images: ['/images/saptapadi-kit.jpg'],
    customizationOptions: [
      { name: 'Cloth Type', choices: ['Cotton', 'Silk'], additionalCost: 1500 },
      { name: 'Additional Samagri', choices: ['Basic', 'Premium'], additionalCost: 2500 }
    ],
    isPopular: true,
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: '4',
    name: 'Bengali Wedding Ritual Kit',
    category: 'Regional',
    description: 'Traditional Bengali wedding essentials including paan, sindoor, and more',
    items: [
      { name: 'Paan Leaves', quantity: 50, isCustomizable: true },
      { name: 'Sindoor Box', quantity: 1, isCustomizable: false },
      { name: 'Conch Shell', quantity: 1, isCustomizable: false },
      { name: 'Red & White Saree', quantity: 1, isCustomizable: true },
      { name: 'Brass Utensils Set', quantity: 1, isCustomizable: false }
    ],
    basePrice: 12000,
    images: ['/images/bengali-kit.jpg'],
    region: 'West Bengal',
    customizationOptions: [
      { name: 'Saree Quality', choices: ['Standard', 'Premium Silk'], additionalCost: 5000 }
    ],
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '5',
    name: 'Sangeet Ceremony Kit',
    category: 'Pre-Wedding',
    description: 'Everything needed for a vibrant Sangeet night celebration',
    items: [
      { name: 'Decorative Props', quantity: 10, isCustomizable: true },
      { name: 'Stage Backdrop', quantity: 1, isCustomizable: true },
      { name: 'Musical Instruments Props', quantity: 5, isCustomizable: false },
      { name: 'LED Lights Set', quantity: 1, isCustomizable: false }
    ],
    basePrice: 7500,
    images: ['/images/sangeet-kit.jpg'],
    customizationOptions: [
      { name: 'Backdrop Theme', choices: ['Traditional', 'Modern', 'Bollywood'], additionalCost: 2000 }
    ],
    isPopular: true,
    rating: 4.6,
    reviewCount: 178
  }
];

// GET all ritual kits
router.get('/', (req, res) => {
  const { category, region, popular } = req.query;
  let filteredKits = [...sampleRitualKits];

  if (category) {
    filteredKits = filteredKits.filter(kit => kit.category === category);
  }
  if (region) {
    filteredKits = filteredKits.filter(kit => kit.region === region);
  }
  if (popular === 'true') {
    filteredKits = filteredKits.filter(kit => kit.isPopular);
  }

  res.json(filteredKits);
});

// GET single ritual kit by ID
router.get('/:id', (req, res) => {
  const kit = sampleRitualKits.find(k => k.id === req.params.id);
  if (!kit) {
    return res.status(404).json({ error: 'Ritual kit not found' });
  }
  res.json(kit);
});

// POST calculate customized price
router.post('/calculate-price', (req, res) => {
  const { kitId, customizations } = req.body;
  const kit = sampleRitualKits.find(k => k.id === kitId);
  
  if (!kit) {
    return res.status(404).json({ error: 'Ritual kit not found' });
  }

  let totalPrice = kit.basePrice;
  
  if (customizations) {
    customizations.forEach(custom => {
      const option = kit.customizationOptions.find(opt => opt.name === custom.name);
      if (option) {
        totalPrice += option.additionalCost;
      }
    });
  }

  res.json({ 
    basePrice: kit.basePrice, 
    totalPrice,
    customizations 
  });
});

module.exports = router;
