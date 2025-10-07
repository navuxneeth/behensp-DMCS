# Behensp - Premium Indian Wedding Logistics Platform

**"Wedding Rituals and Tradition, Simplified"**

A premium, luxury e-commerce platform that simplifies the logistical and material complexities of Indian weddings. We are not merely a store; we are a comprehensive planning tool, a personalized concierge, and a trusted partner that allows modern families to honour rich cultural traditions with convenience, elegance, and peace of mind.

## 🌟 Brand Essence

For modern Indian families, we are the premium e-commerce platform that provides culturally-authentic, fully customizable ritual kits and logistical solutions, delivering a sense of control and luxury that fragmented local markets and impersonal online giants cannot offer.

## ✨ Core Features

### Guided Onboarding Experience
- **Cultural Traditions Selection**: Choose from Punjabi, Tamil, Bengali, Maharashtrian, Gujarati, South Indian, and more
- **Wedding Planning**: Set your wedding date and select events (Roka, Mehendi, Haldi, Sangeet, Wedding, Reception)
- **Personalized Journey**: Tailored recommendations based on your cultural preferences

### Premium Product Catalog
- **Customizable Ritual Kits**: Traditional ceremony kits with region-specific options
- **Premium Rental Service**: Designer attire, jewelry, and decor items
- **Multi-Checklist Planner**: Comprehensive wedding task management
- **Live Cost Calculator**: Real-time budget estimation in INR

### Saathi - Your AI Wedding Concierge
- **24/7 Intelligent Assistance**: Context-aware suggestions and cultural guidance
- **Proactive Support**: Personalized recommendations based on your selections
- **Cultural Knowledge**: Answer questions about wedding rituals and traditions

### Secure & Convenient
- **Razorpay Payment Gateway**: Multiple payment methods including UPI, cards, net banking, and EMI
- **B2B Portal**: Dedicated services for professional wedding planners

## 🎨 Design Philosophy

### Typography
- **Headings**: Playfair Display (elegant serif for sophistication)
- **Body Text**: Merriweather (highly readable serif for all content)
- **Accent**: Lora (for special elements)

### Color Palette
- **Primary**: Emerald Green (#0D5B41) - Deep, luxurious accent
- **Gold**: Metallic Gold (#C9B068) - Luxury highlights and decorative elements
- **Background**: Warm Ivory (#FDF8F0) - Generous white space
- **Text**: Charcoal Grey (#333333) - Soft, easy-to-read primary text
- **White**: Pure White (#FFFFFF) - Card backgrounds

### User Experience
- Clean, sophisticated, and reassuring design
- Generous white space for calm, organized feel
- Elegant serif typography throughout
- High-quality imagery showcasing cultural context

## 🎯 Target Users

### Primary (B2C)
- Modern couples planning their wedding
- Families honoring cultural traditions
- Tech-savvy users seeking convenience

### Secondary (B2B)
- Professional wedding planners
- Event management companies
- Bulk requirement businesses

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (optional for local development)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/navuxneeth/behensp-DMCS.git
cd behensp-DMCS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

5. Open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
behensp-DMCS/
├── server/
│   ├── index.js              # Main server file
│   ├── routes/               # API routes
│   │   ├── ritualKits.js     # Ritual kits catalog
│   │   ├── rental.js         # Rental service
│   │   ├── checklist.js      # Wedding planner
│   │   ├── calculator.js     # Budget calculator
│   │   ├── chatbot.js        # AI chatbot
│   │   ├── payment.js        # Payment gateway
│   │   └── auth.js           # Authentication
│   ├── models/               # Database models
│   │   ├── RitualKit.js
│   │   ├── RentalItem.js
│   │   ├── Checklist.js
│   │   └── User.js
│   ├── controllers/          # Business logic
│   ├── middleware/           # Custom middleware
│   └── config/               # Configuration files
├── public/
│   └── index.html            # Frontend application
├── package.json
├── .env.example
└── README.md
```

## 🎨 Features in Detail

### 1. Ritual Kits Catalog
- Pre-Wedding ceremonies (Haldi, Mehendi, Sangeet)
- Wedding ceremonies (Saptapadi, Kanyadaan)
- Regional variations (Bengali, South Indian, Gujarati, Punjabi)
- Full customization options
- Real-time pricing

### 2. Rental Services
- **Bridal Wear**: Designer lehengas, sarees, and accessories
- **Groom Wear**: Sherwanis, pagdis, and traditional attire
- **Jewelry**: Kundan sets, temple jewelry, nath, and more
- **Decor Items**: Mandap decorations, props, and lighting
- Date-based availability checking
- Security deposit management

### 3. Wedding Planner
- Timeline-based task organization
- Category-wise grouping (Venue, Catering, Rituals, etc.)
- Priority levels (High, Medium, Low)
- Progress tracking
- Customizable templates

### 4. Budget Calculator
- Multiple quality tiers (Basic, Standard, Premium, Luxury)
- Per-guest cost calculation
- Category-wise breakdown
- Contingency planning
- EMI calculator

### 5. AI Chatbot
- Intent recognition
- Context-aware responses
- Multi-topic support
- 24/7 availability
- Feedback collection

### 6. Payment Integration
- Multiple payment methods (UPI, Cards, Net Banking, Wallets)
- Secure Razorpay gateway
- EMI options
- Refund management
- Transaction tracking

## 🔧 API Endpoints

### Ritual Kits
```
GET    /api/ritual-kits          # Get all ritual kits
GET    /api/ritual-kits/:id      # Get specific kit
POST   /api/ritual-kits/calculate-price  # Calculate customized price
```

### Rental Services
```
GET    /api/rental               # Get all rental items
GET    /api/rental/:id           # Get specific item
POST   /api/rental/check-availability  # Check availability
```

### Checklist
```
GET    /api/checklist/template   # Get checklist template
POST   /api/checklist/create     # Create personalized checklist
PUT    /api/checklist/:id/items/:itemId  # Update checklist item
POST   /api/checklist/:id/items  # Add custom item
```

### Calculator
```
POST   /api/calculator/estimate  # Calculate wedding cost
GET    /api/calculator/guidelines  # Get cost guidelines
POST   /api/calculator/compare   # Compare packages
```

### Chatbot
```
GET    /api/chatbot/suggestions  # Get suggested questions
POST   /api/chatbot/chat         # Send chat message
POST   /api/chatbot/feedback     # Submit feedback
```

### Payment
```
POST   /api/payment/create-order  # Create payment order
POST   /api/payment/verify-payment  # Verify payment
GET    /api/payment/methods      # Get payment methods
POST   /api/payment/calculate-emi  # Calculate EMI
```

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/verify          # Verify token
POST   /api/auth/forgot-password  # Request password reset
POST   /api/auth/reset-password  # Reset password
```

## 🎨 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcryptjs
- **Payment**: Razorpay integration

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript**: Vanilla JS with async/await
- **Fonts**: Google Fonts (Playfair Display, Poppins)

### Design
- **Color Scheme**: Indian wedding theme (Gold, Maroon, Red)
- **Typography**: Elegant serif + modern sans-serif combination
- **Responsive**: Mobile-first approach
- **UI/UX**: Clean, intuitive, and culturally relevant

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- CORS protection
- Input validation
- Secure payment gateway
- Environment variable protection

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in `.env`
2. Configure MongoDB connection string
3. Set up Razorpay production keys
4. Configure domain and SSL certificate

### Hosting Options
- **Backend**: Railway, Render, Heroku, AWS EC2
- **Database**: MongoDB Atlas
- **CDN**: Cloudflare for static assets

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For support, email info@behensp.com or call +91 98765 43210

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for the Indian wedding market
- Inspired by traditional ceremonies and modern convenience

---

**Behensp** - Making Indian Weddings Beautiful and Memorable! 🎊