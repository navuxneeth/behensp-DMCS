const express = require('express');
const router = express.Router();

// AI Chatbot responses (in production, integrate with OpenAI or similar)
const knowledgeBase = {
  greetings: [
    "Namaste! Welcome to our wedding planning platform. How may I assist you today?",
    "Hello! I'm your AI wedding concierge. I'm here to help make your special day perfect!",
    "Welcome! I'm here to guide you through your wedding planning journey. What would you like to know?"
  ],
  ritualKits: {
    general: "We offer a wide range of ritual kits for Indian weddings including Haldi, Mehendi, Saptapadi, and regional variations. Each kit is customizable to your needs.",
    haldi: "The Haldi ceremony kit includes turmeric paste, flowers, ceremonial items, and brass plates. Prices start at ₹5,000 and can be customized.",
    mehendi: "Our Mehendi ceremony kit includes henna cones, decorative trays, cushions, and lights. Perfect for creating a festive atmosphere!",
    regional: "We offer region-specific kits for Bengali, South Indian, Gujarati, Punjabi, and more traditional weddings."
  },
  rental: {
    general: "Our rental service includes bridal lehengas, groom sherwanis, jewelry sets, and decor items. All items are professionally cleaned and maintained.",
    jewelry: "Rental jewelry includes Kundan sets, Polki sets, temple jewelry, and more. Security deposits apply. Saves 50-70% compared to purchase.",
    attire: "We have a vast collection of bridal and groom attire in various sizes and styles. Daily rental rates with flexible booking options.",
    availability: "To check availability, please provide your wedding date and the items you're interested in."
  },
  planning: {
    timeline: "Ideally, start planning 8-12 months before your wedding. We provide a comprehensive checklist to keep you on track.",
    checklist: "Our multi-checklist planner covers everything from venue booking to day-of coordination, organized by priority and timeline.",
    budget: "Use our live cost calculator to estimate your wedding budget. It covers all major categories and provides realistic INR estimates."
  },
  payment: {
    methods: "We accept UPI, credit/debit cards, net banking, and EMI options through our secure Razorpay gateway.",
    security: "All payments are processed through secure, PCI-compliant gateways. Your financial information is encrypted and safe.",
    refund: "Refund policies vary by service. Cancellations made 30+ days in advance receive 75% refund, minus processing fees."
  },
  b2b: {
    general: "We offer special B2B packages for wedding planners with bulk discounts, dedicated support, and flexible payment terms.",
    benefits: "B2B clients get priority booking, volume discounts up to 25%, and a dedicated account manager.",
    signup: "To register as a B2B partner, create an account and select 'Wedding Planner' as your account type."
  }
};

// Helper function to analyze intent
function analyzeIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  if (/hello|hi|hey|namaste|greetings/.test(lowerMessage)) {
    return 'greeting';
  }
  if (/ritual|kit|haldi|mehendi|ceremony|saptapadi/.test(lowerMessage)) {
    if (/haldi/.test(lowerMessage)) return 'ritual_haldi';
    if (/mehendi|mehndi/.test(lowerMessage)) return 'ritual_mehendi';
    if (/regional|bengali|south indian|gujarati|punjabi/.test(lowerMessage)) return 'ritual_regional';
    return 'ritual_general';
  }
  if (/rental|rent|lease|borrow|attire|jewelry|lehenga|sherwani/.test(lowerMessage)) {
    if (/jewelry|jewellery|necklace|kundan|polki/.test(lowerMessage)) return 'rental_jewelry';
    if (/lehenga|sherwani|attire|dress|clothes/.test(lowerMessage)) return 'rental_attire';
    if (/available|availability|book/.test(lowerMessage)) return 'rental_availability';
    return 'rental_general';
  }
  if (/checklist|plan|timeline|schedule|organize/.test(lowerMessage)) {
    if (/timeline|when|start/.test(lowerMessage)) return 'planning_timeline';
    if (/checklist|list|tasks/.test(lowerMessage)) return 'planning_checklist';
    if (/budget|cost|price|expense/.test(lowerMessage)) return 'planning_budget';
    return 'planning_general';
  }
  if (/payment|pay|price|cost|budget|calculator/.test(lowerMessage)) {
    if (/method|how to pay|upi|card/.test(lowerMessage)) return 'payment_methods';
    if (/secure|safe|security/.test(lowerMessage)) return 'payment_security';
    if (/refund|cancel|return/.test(lowerMessage)) return 'payment_refund';
    return 'payment_general';
  }
  if (/b2b|business|planner|bulk|wholesale/.test(lowerMessage)) {
    if (/benefit|advantage|why/.test(lowerMessage)) return 'b2b_benefits';
    if (/signup|register|join/.test(lowerMessage)) return 'b2b_signup';
    return 'b2b_general';
  }
  if (/thank|thanks/.test(lowerMessage)) {
    return 'thanks';
  }
  
  return 'unknown';
}

// Helper function to get response
function getResponse(intent) {
  switch (intent) {
    case 'greeting':
      return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    case 'ritual_general':
      return knowledgeBase.ritualKits.general;
    case 'ritual_haldi':
      return knowledgeBase.ritualKits.haldi;
    case 'ritual_mehendi':
      return knowledgeBase.ritualKits.mehendi;
    case 'ritual_regional':
      return knowledgeBase.ritualKits.regional;
    case 'rental_general':
      return knowledgeBase.rental.general;
    case 'rental_jewelry':
      return knowledgeBase.rental.jewelry;
    case 'rental_attire':
      return knowledgeBase.rental.attire;
    case 'rental_availability':
      return knowledgeBase.rental.availability;
    case 'planning_timeline':
      return knowledgeBase.planning.timeline;
    case 'planning_checklist':
      return knowledgeBase.planning.checklist;
    case 'planning_budget':
      return knowledgeBase.planning.budget;
    case 'payment_methods':
      return knowledgeBase.payment.methods;
    case 'payment_security':
      return knowledgeBase.payment.security;
    case 'payment_refund':
      return knowledgeBase.payment.refund;
    case 'b2b_general':
      return knowledgeBase.b2b.general;
    case 'b2b_benefits':
      return knowledgeBase.b2b.benefits;
    case 'b2b_signup':
      return knowledgeBase.b2b.signup;
    case 'thanks':
      return "You're welcome! Feel free to ask if you need anything else. Have a beautiful wedding! 🎊";
    default:
      return "I'd be happy to help! I can assist you with ritual kits, rental services, wedding checklists, cost calculations, and B2B services. What would you like to know more about?";
  }
}

// GET suggested questions
router.get('/suggestions', (req, res) => {
  const suggestions = [
    "What ritual kits do you offer?",
    "Tell me about jewelry rental options",
    "How do I create a wedding checklist?",
    "What payment methods do you accept?",
    "What are the benefits of B2B membership?",
    "How much does a wedding typically cost?",
    "Do you have Haldi ceremony kits?",
    "Can I rent bridal attire?"
  ];
  
  res.json({ suggestions });
});

// POST chat message
router.post('/chat', (req, res) => {
  const { message, conversationId } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const intent = analyzeIntent(message);
  const response = getResponse(intent);
  
  // In production, maintain conversation context and use AI for better responses
  const reply = {
    message: response,
    intent,
    timestamp: new Date().toISOString(),
    conversationId: conversationId || Date.now().toString()
  };

  res.json(reply);
});

// POST feedback on chatbot response
router.post('/feedback', (req, res) => {
  const { conversationId, messageId, helpful } = req.body;
  
  // In production, store feedback for improving AI responses
  res.json({
    message: 'Thank you for your feedback!',
    recorded: true
  });
});

module.exports = router;
