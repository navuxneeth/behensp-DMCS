const express = require('express');
const router = express.Router();

// Sample rental items data
const sampleRentalItems = [
  {
    id: '1',
    name: 'Bridal Lehenga - Royal Red',
    category: 'Bridal Wear',
    subcategory: 'Lehenga',
    description: 'Exquisite hand-embroidered red bridal lehenga with intricate zari work and stone embellishments',
    dailyRentalPrice: 8000,
    securityDeposit: 50000,
    images: ['/images/bridal-lehenga-red.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Maroon'],
    availability: true,
    rating: 4.9,
    reviewCount: 87,
    features: ['Hand Embroidery', 'Zari Work', 'Stone Work', 'Dry Clean Only']
  },
  {
    id: '2',
    name: 'Groom Sherwani - Golden Silk',
    category: 'Groom Wear',
    subcategory: 'Sherwani',
    description: 'Premium silk sherwani with gold embroidery, perfect for the wedding day',
    dailyRentalPrice: 5000,
    securityDeposit: 30000,
    images: ['/images/sherwani-gold.jpg'],
    sizes: ['38', '40', '42', '44', '46'],
    colors: ['Golden', 'Cream'],
    availability: true,
    rating: 4.8,
    reviewCount: 124,
    features: ['Pure Silk', 'Gold Embroidery', 'Includes Turban', 'Dry Clean Only']
  },
  {
    id: '3',
    name: 'Kundan Jewelry Set',
    category: 'Jewelry',
    subcategory: 'Bridal Set',
    description: 'Complete kundan jewelry set including necklace, earrings, maang tikka, and bangles',
    dailyRentalPrice: 6000,
    securityDeposit: 150000,
    images: ['/images/kundan-set.jpg'],
    sizes: ['One Size'],
    colors: ['Gold'],
    availability: true,
    rating: 4.9,
    reviewCount: 156,
    features: ['Kundan Stones', 'Gold Plated', 'Complete Set', 'Insurance Recommended']
  },
  {
    id: '4',
    name: 'Bridal Dupatta - Net Embroidered',
    category: 'Bridal Wear',
    subcategory: 'Dupatta',
    description: 'Elegant net dupatta with heavy embroidery and border work',
    dailyRentalPrice: 2000,
    securityDeposit: 15000,
    images: ['/images/dupatta-net.jpg'],
    sizes: ['Standard'],
    colors: ['Red', 'Pink', 'Gold'],
    availability: true,
    rating: 4.7,
    reviewCount: 93,
    features: ['Net Fabric', 'Heavy Embroidery', 'Border Work']
  },
  {
    id: '5',
    name: 'Traditional Pagdi with Kalgi',
    category: 'Groom Wear',
    subcategory: 'Accessories',
    description: 'Royal pagdi (turban) with decorative kalgi for groom',
    dailyRentalPrice: 1500,
    securityDeposit: 8000,
    images: ['/images/pagdi-kalgi.jpg'],
    sizes: ['Adjustable'],
    colors: ['Red', 'Golden', 'Cream', 'Maroon'],
    availability: true,
    rating: 4.6,
    reviewCount: 201,
    features: ['Includes Kalgi', 'Adjustable Size', 'Multiple Colors']
  },
  {
    id: '6',
    name: 'Nath (Nose Ring) - Pearl',
    category: 'Jewelry',
    subcategory: 'Nose Ring',
    description: 'Traditional pearl nath with gold plating',
    dailyRentalPrice: 800,
    securityDeposit: 10000,
    images: ['/images/nath-pearl.jpg'],
    sizes: ['One Size'],
    colors: ['Gold with White Pearls'],
    availability: true,
    rating: 4.8,
    reviewCount: 167,
    features: ['Pearl Work', 'Gold Plated', 'Hygienic Packing']
  },
  {
    id: '7',
    name: 'Floral Mandap Decor Set',
    category: 'Decor Items',
    subcategory: 'Mandap',
    description: 'Complete mandap decoration set with artificial flowers and drapes',
    dailyRentalPrice: 15000,
    securityDeposit: 50000,
    images: ['/images/mandap-decor.jpg'],
    sizes: ['Standard (12x12 ft)'],
    colors: ['Red & Gold', 'Pink & White', 'Orange & Yellow'],
    availability: true,
    rating: 4.7,
    reviewCount: 78,
    features: ['Includes Setup', 'Artificial Flowers', 'Reusable', 'Setup Service Available']
  },
  {
    id: '8',
    name: 'Designer Saree - Banarasi Silk',
    category: 'Bridal Wear',
    subcategory: 'Saree',
    description: 'Authentic Banarasi silk saree with traditional motifs',
    dailyRentalPrice: 4000,
    securityDeposit: 40000,
    images: ['/images/banarasi-saree.jpg'],
    sizes: ['One Size'],
    colors: ['Red', 'Blue', 'Green', 'Purple'],
    availability: true,
    rating: 4.8,
    reviewCount: 142,
    features: ['Pure Banarasi Silk', 'Traditional Motifs', 'Handwoven']
  }
];

// GET all rental items
router.get('/', (req, res) => {
  const { category, subcategory, minPrice, maxPrice, available } = req.query;
  let filteredItems = [...sampleRentalItems];

  if (category) {
    filteredItems = filteredItems.filter(item => item.category === category);
  }
  if (subcategory) {
    filteredItems = filteredItems.filter(item => item.subcategory === subcategory);
  }
  if (minPrice) {
    filteredItems = filteredItems.filter(item => item.dailyRentalPrice >= parseInt(minPrice));
  }
  if (maxPrice) {
    filteredItems = filteredItems.filter(item => item.dailyRentalPrice <= parseInt(maxPrice));
  }
  if (available === 'true') {
    filteredItems = filteredItems.filter(item => item.availability);
  }

  res.json(filteredItems);
});

// GET single rental item by ID
router.get('/:id', (req, res) => {
  const item = sampleRentalItems.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Rental item not found' });
  }
  res.json(item);
});

// POST check availability for dates
router.post('/check-availability', (req, res) => {
  const { itemId, startDate, endDate } = req.body;
  const item = sampleRentalItems.find(i => i.id === itemId);
  
  if (!item) {
    return res.status(404).json({ error: 'Rental item not found' });
  }

  // In a real implementation, this would check against booked dates
  const isAvailable = item.availability;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  const totalCost = item.dailyRentalPrice * days;

  res.json({
    available: isAvailable,
    days,
    dailyRate: item.dailyRentalPrice,
    totalCost,
    securityDeposit: item.securityDeposit,
    grandTotal: totalCost + item.securityDeposit
  });
});

// GET rental categories
router.get('/meta/categories', (req, res) => {
  const categories = [...new Set(sampleRentalItems.map(item => item.category))];
  res.json(categories);
});

module.exports = router;
