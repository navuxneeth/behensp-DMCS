# Behensp Platform - Features Documentation

## 🎯 Overview
A comprehensive premium e-commerce platform for Indian wedding logistics, serving both B2C (couples) and B2B (wedding planners) markets.

## ✨ Core Features Implemented

### 1. Customizable Ritual Kits 🎁
**5 Traditional Ceremony Kits:**
- **Haldi Ceremony Kit** (₹5,000) - Turmeric paste, flowers, brass plates, ceremonial items
- **Mehendi Ceremony Kit** (₹4,500) - Henna cones, decorative trays, cushions, lights
- **Saptapadi Wedding Kit** (₹8,000) - Sacred fire pit, ghee, samagri, ceremonial cloth
- **Bengali Wedding Ritual Kit** (₹12,000) - Regional specialties including paan, sindoor, conch shell
- **Sangeet Ceremony Kit** (₹7,500) - Props, backdrop, LED lights, musical instruments

**Features:**
- Full customization options for each kit
- Choice of quality levels (Standard/Premium)
- Color and quantity customization
- Regional variations support
- Real-time price calculation based on customizations

### 2. Premium Rental Services 👗💍
**8 High-End Rental Items:**

**Bridal Wear:**
- Bridal Lehenga - Royal Red (₹8,000/day) - Hand-embroidered with zari work
- Banarasi Silk Saree (₹4,000/day) - Traditional motifs, handwoven
- Net Embroidered Dupatta (₹2,000/day) - Heavy border work

**Groom Wear:**
- Golden Silk Sherwani (₹5,000/day) - Gold embroidery, includes turban
- Traditional Pagdi with Kalgi (₹1,500/day) - Adjustable, multiple colors

**Jewelry:**
- Kundan Jewelry Set (₹6,000/day) - Complete bridal set, ₹1.5L security deposit
- Pearl Nath (₹800/day) - Traditional nose ring with gold plating

**Decor:**
- Floral Mandap Set (₹15,000/day) - 12x12 ft setup with artificial flowers

**Features:**
- Date-based availability checking
- Security deposit management
- Size and color options
- Professional cleaning included
- Insurance recommendations for high-value items

### 3. Multi-Checklist Wedding Planner 📋
**17 Pre-Configured Tasks:**
- Book Wedding Venue (180 days before)
- Hire Wedding Planner (180 days before)
- Select Catering Service (150 days before)
- Book Photographer & Videographer (120 days before)
- Choose Wedding Attire (120 days before)
- Send Save-the-Date Cards (90 days before)
- Book Mehendi Artist (60 days before)
- Arrange Guest Accommodation (60 days before)
- Plan Sangeet Ceremony (45 days before)
- Order Wedding Invitations (45 days before)
- Book Makeup Artist (30 days before)
- Finalize Decoration Theme (30 days before)
- Purchase Ritual Items (21 days before)
- Confirm Guest Count (14 days before)
- Arrange Transportation (14 days before)
- Conduct Haldi Ceremony (2 days before)
- Final Venue Walkthrough (1 day before)

**Features:**
- Timeline-based organization
- Category grouping (Venue, Catering, Rituals, etc.)
- Priority levels (High, Medium, Low)
- Progress tracking
- Custom task addition
- Personalized with couple names and wedding date
- Notes and assignee fields

### 4. Live Wedding Budget Calculator 💰
**Comprehensive Cost Estimation:**

**Categories Covered:**
- Venue (4 tiers: Basic to Luxury)
- Catering (per-person rates: ₹500-₹5,000)
- Decoration (₹50K-₹2.5M range)
- Photography (₹50K-₹800K)
- Bride & Groom Attire
- Jewelry (Rental vs Purchase)
- Rituals & Ceremonies
- Entertainment
- Miscellaneous (10% of subtotal)
- Contingency (15% of total)

**Example Calculation:**
- 250 guests, Premium tier, 3 events
- **Total: ₹10,632,325**
- **Per Guest: ₹42,529**

**Features:**
- Multiple quality tiers
- Per-guest cost breakdown
- Number of events multiplier
- Package comparison tool
- Budget guidelines and tips
- EMI calculator for financing

### 5. AI Concierge Chatbot 🤖
**Intelligent Wedding Assistant:**

**Knowledge Domains:**
- Ritual kits information
- Rental service queries
- Planning and timeline advice
- Budget and cost calculations
- Payment methods
- B2B services information

**Sample Conversations:**
- "Tell me about Haldi ceremony kits"
- "What rental jewelry options do you have?"
- "How do I create a wedding checklist?"
- "What payment methods do you accept?"
- "What are B2B benefits?"

**Features:**
- Intent recognition
- Context-aware responses
- 24/7 availability
- Greeting variations (Namaste!)
- Feedback collection
- Suggested questions
- Multi-topic support

### 6. Secure Payment Gateway 🔒
**Razorpay Integration:**

**Payment Methods:**
- Credit/Debit Cards (Visa, Mastercard, Amex, RuPay)
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking (All major banks)
- Digital Wallets
- EMI Options (3, 6, 9, 12, 18, 24 months)

**Features:**
- Order creation and tracking
- Payment verification with signature
- Refund processing (75% refund for 30+ days cancellation)
- EMI calculator with interest rates
- Secure PCI-compliant transactions
- Transaction history

**Example EMI Calculation:**
- Amount: ₹500,000
- 12 months tenure @ 15% interest
- EMI: ₹45,015/month
- Total payable: ₹540,180

### 7. Authentication & User Management 👤
**Secure User System:**

**Account Types:**
- **B2C (Couples)** - Wedding date, partner name, personal details
- **B2B (Wedding Planners)** - Company name, bulk access, priority booking

**Features:**
- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- 7-day session validity
- Password reset functionality
- Email verification flow
- Profile management

## 🎨 Design & User Experience

### Color Scheme
- **Primary Gold:** #d4af37 (Auspicious Indian wedding color)
- **Secondary Maroon:** #8b0000 (Traditional elegance)
- **Accent Red:** #ff6b6b (Celebration vibes)
- **Light Background:** #fef9f3 (Warm, inviting)

### Typography
- **Headers:** Playfair Display (Elegant serif)
- **Body:** Poppins (Modern, readable sans-serif)

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 1200px
- Touch-friendly elements
- Optimized images and icons

### UI Components
- Feature cards with hover effects
- Product cards with pricing badges
- Interactive forms with validation
- Smooth animations and transitions
- Fixed navigation bar
- Floating chatbot button
- Elegant footer with sections

## 📊 Technical Specifications

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.18.2
- **Database:** MongoDB with Mongoose 8.0.0
- **Security:** bcryptjs, JWT, CORS
- **Environment:** dotenv for configuration

### Frontend
- **HTML5** with semantic markup
- **CSS3** with custom properties
- **Vanilla JavaScript** with async/await
- **Google Fonts** for typography
- **Responsive design** principles

### API Endpoints
- `/api/health` - Health check
- `/api/ritual-kits` - Ritual kits catalog
- `/api/rental` - Rental items
- `/api/checklist` - Wedding planner
- `/api/calculator` - Budget calculator
- `/api/chatbot` - AI assistant
- `/api/payment` - Payment gateway
- `/api/auth` - Authentication

### Database Models
- **User** - Authentication and profile
- **RitualKit** - Ceremony packages
- **RentalItem** - Rental inventory
- **Checklist** - Wedding tasks

## 🚀 Getting Started

### Quick Start
```bash
# Clone the repository
git clone https://github.com/navuxneeth/behensp-DMCS.git

# Install dependencies
npm install

# Start the server
npm start

# Access the platform
http://localhost:5000
```

### Environment Setup
Copy `.env.example` to `.env` and configure:
- MongoDB URI
- JWT Secret
- Razorpay Keys
- OpenAI API Key (for enhanced chatbot)

## 📈 Business Model

### B2C Features
- Browse and purchase ritual kits
- Rent designer attire and jewelry
- Create personalized wedding checklists
- Calculate budget estimates
- Access AI-powered planning assistance

### B2B Features
- Bulk discounts (up to 25%)
- Priority booking
- Dedicated account manager
- Flexible payment terms
- Volume pricing for multiple events

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Secure payment gateway
- Environment variable protection
- HTTPS recommended for production

## 📱 Mobile Experience

- Fully responsive design
- Touch-optimized controls
- Fast loading times
- Simplified navigation
- Mobile-friendly forms
- Optimized chatbot interface

## 🎯 Target Audience

### Primary (B2C)
- Engaged couples planning their wedding
- Age group: 25-35 years
- Urban and semi-urban areas
- Tech-savvy users
- Budget-conscious yet quality-focused

### Secondary (B2B)
- Professional wedding planners
- Event management companies
- Venue owners
- Decorator services
- Bulk requirement businesses

## 🌟 Unique Selling Points

1. **One-Stop Solution** - Everything needed for Indian weddings
2. **Cultural Authenticity** - Region-specific ritual kits
3. **Cost Savings** - Rental options save 50-70% vs purchase
4. **Smart Planning** - AI-powered assistance and checklists
5. **Flexible Payments** - Multiple methods including EMI
6. **Premium Quality** - Designer items with professional service
7. **B2B Support** - Dedicated services for wedding planners

## 📊 Sample Data

### Popular Ritual Kits
- Haldi: 4.8★ (156 reviews)
- Mehendi: 4.7★ (203 reviews)
- Saptapadi: 4.9★ (312 reviews)
- Bengali: 4.8★ (89 reviews)
- Sangeet: 4.6★ (178 reviews)

### Popular Rentals
- Bridal Lehenga: 4.9★ (87 reviews)
- Sherwani: 4.8★ (124 reviews)
- Kundan Set: 4.9★ (156 reviews)

## 🎓 Use Cases

### Case 1: Engaged Couple
1. Browse ritual kits for Haldi ceremony
2. Customize with premium options
3. Add to cart (₹7,000 total)
4. Use calculator for full wedding budget
5. Generate 180-day checklist
6. Chat with AI about timeline
7. Secure payment via UPI

### Case 2: Wedding Planner
1. Register B2B account
2. Browse bulk options for 5 weddings
3. Check rental availability for next 3 months
4. Get volume discount quote
5. Compare package tiers
6. Book with flexible payment terms
7. Access priority customer support

## 📞 Support

- **Email:** info@behensp.com
- **Phone:** +91 98765 43210
- **Location:** Mumbai, India
- **Hours:** 24/7 AI support, 9 AM - 9 PM human support

---

**Behensp** - Making Indian Weddings Beautiful and Memorable! 🎊
