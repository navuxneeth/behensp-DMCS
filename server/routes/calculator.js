const express = require('express');
const router = express.Router();

// Wedding cost estimation calculator
const costCategories = {
  venue: {
    basic: { min: 100000, max: 300000 },
    standard: { min: 300000, max: 800000 },
    premium: { min: 800000, max: 2000000 },
    luxury: { min: 2000000, max: 5000000 }
  },
  catering: {
    perPerson: {
      basic: 500,
      standard: 1000,
      premium: 2000,
      luxury: 5000
    }
  },
  decoration: {
    basic: { min: 50000, max: 150000 },
    standard: { min: 150000, max: 400000 },
    premium: { min: 400000, max: 1000000 },
    luxury: { min: 1000000, max: 2500000 }
  },
  photography: {
    basic: 50000,
    standard: 150000,
    premium: 300000,
    luxury: 800000
  },
  attire: {
    bride: {
      basic: 50000,
      standard: 150000,
      premium: 500000,
      luxury: 1500000
    },
    groom: {
      basic: 30000,
      standard: 80000,
      premium: 250000,
      luxury: 800000
    }
  },
  jewelry: {
    rental: {
      basic: 20000,
      standard: 50000,
      premium: 150000,
      luxury: 500000
    },
    purchase: {
      basic: 200000,
      standard: 800000,
      premium: 2500000,
      luxury: 10000000
    }
  },
  rituals: {
    basic: 25000,
    standard: 75000,
    premium: 150000,
    luxury: 300000
  },
  entertainment: {
    basic: 30000,
    standard: 100000,
    premium: 300000,
    luxury: 1000000
  }
};

// POST calculate wedding cost
router.post('/estimate', (req, res) => {
  const {
    guestCount,
    venue,
    catering,
    decoration,
    photography,
    brideAttire,
    groomAttire,
    jewelry,
    jewelryType,
    rituals,
    entertainment,
    numberOfEvents
  } = req.body;

  let breakdown = {};
  let total = 0;

  // Venue cost
  if (venue && costCategories.venue[venue]) {
    const venueCost = (costCategories.venue[venue].min + costCategories.venue[venue].max) / 2;
    breakdown.venue = venueCost * (numberOfEvents || 1);
    total += breakdown.venue;
  }

  // Catering cost
  if (catering && guestCount) {
    breakdown.catering = costCategories.catering.perPerson[catering] * guestCount * (numberOfEvents || 1);
    total += breakdown.catering;
  }

  // Decoration cost
  if (decoration && costCategories.decoration[decoration]) {
    const decorationCost = (costCategories.decoration[decoration].min + costCategories.decoration[decoration].max) / 2;
    breakdown.decoration = decorationCost * (numberOfEvents || 1);
    total += breakdown.decoration;
  }

  // Photography cost
  if (photography) {
    breakdown.photography = costCategories.photography[photography];
    total += breakdown.photography;
  }

  // Attire cost
  if (brideAttire) {
    breakdown.brideAttire = costCategories.attire.bride[brideAttire];
    total += breakdown.brideAttire;
  }
  if (groomAttire) {
    breakdown.groomAttire = costCategories.attire.groom[groomAttire];
    total += breakdown.groomAttire;
  }

  // Jewelry cost
  if (jewelry && jewelryType) {
    breakdown.jewelry = costCategories.jewelry[jewelryType][jewelry];
    total += breakdown.jewelry;
  }

  // Rituals cost
  if (rituals) {
    breakdown.rituals = costCategories.rituals[rituals];
    total += breakdown.rituals;
  }

  // Entertainment cost
  if (entertainment) {
    breakdown.entertainment = costCategories.entertainment[entertainment];
    total += breakdown.entertainment;
  }

  // Add miscellaneous (10% of total)
  const miscellaneous = total * 0.1;
  breakdown.miscellaneous = miscellaneous;
  total += miscellaneous;

  // Add contingency (15% of total)
  const contingency = total * 0.15;
  breakdown.contingency = contingency;
  total += contingency;

  res.json({
    breakdown,
    subtotal: total - contingency - miscellaneous,
    miscellaneous,
    contingency,
    total: Math.round(total),
    currency: 'INR',
    perGuestCost: guestCount ? Math.round(total / guestCount) : 0
  });
});

// GET cost guidelines
router.get('/guidelines', (req, res) => {
  res.json({
    categories: Object.keys(costCategories),
    tiers: ['basic', 'standard', 'premium', 'luxury'],
    recommendations: {
      guestCount: {
        small: { min: 50, max: 150 },
        medium: { min: 150, max: 300 },
        large: { min: 300, max: 600 },
        extraLarge: { min: 600, max: 1500 }
      },
      budgetTips: [
        'Book vendors 6-12 months in advance for better rates',
        'Consider off-season dates for venue discounts',
        'Rental jewelry can save 50-70% compared to purchase',
        'Digital invitations can reduce printing costs significantly',
        'Weekday weddings often get 20-30% venue discounts'
      ]
    }
  });
});

// POST compare packages
router.post('/compare', (req, res) => {
  const { guestCount, numberOfEvents = 1 } = req.body;
  const tiers = ['basic', 'standard', 'premium', 'luxury'];
  
  const packages = tiers.map(tier => {
    const venueCost = (costCategories.venue[tier].min + costCategories.venue[tier].max) / 2;
    const cateringCost = costCategories.catering.perPerson[tier] * (guestCount || 200);
    const decorationCost = (costCategories.decoration[tier].min + costCategories.decoration[tier].max) / 2;
    const photographyCost = costCategories.photography[tier];
    const brideAttireCost = costCategories.attire.bride[tier];
    const groomAttireCost = costCategories.attire.groom[tier];
    const jewelryCost = costCategories.jewelry.rental[tier];
    const ritualsCost = costCategories.rituals[tier];
    const entertainmentCost = costCategories.entertainment[tier];
    
    let subtotal = (venueCost + cateringCost + decorationCost) * numberOfEvents + 
                   photographyCost + brideAttireCost + groomAttireCost + 
                   jewelryCost + ritualsCost + entertainmentCost;
    
    const misc = subtotal * 0.1;
    const contingency = (subtotal + misc) * 0.15;
    const total = subtotal + misc + contingency;
    
    return {
      tier,
      total: Math.round(total),
      perGuest: Math.round(total / (guestCount || 200)),
      highlights: tier === 'basic' ? ['Essential services', 'Budget-friendly'] :
                  tier === 'standard' ? ['Quality services', 'Good value'] :
                  tier === 'premium' ? ['Premium quality', 'Luxury touches'] :
                  ['Ultra-luxury', 'Bespoke services']
    };
  });
  
  res.json({ packages, currency: 'INR' });
});

module.exports = router;
