# CryptoBloom SaaS Platform

A comprehensive SaaS platform that combines cryptocurrency trading with premium flower delivery services, featuring a modern dashboard, real-time analytics, and administrative tools.

## 🚀 Features

### Core Functionality
- **Cryptocurrency Trading**: Buy/sell Bitcoin, Ethereum, and other cryptocurrencies
- **Flower Delivery**: Premium flower arrangements with worldwide delivery
- **User Dashboard**: Real-time analytics and portfolio management
- **Admin Panel**: Comprehensive moderation tools for managing users, trades, and orders
- **Email Notifications**: Automated welcome emails and order confirmations

### Technical Features
- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Real-time Updates**: Live trading data and order tracking
- **Secure Authentication**: JWT-based auth with role-based access control
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Docker Containerization**: Easy deployment and scaling
- **Redis Caching**: Improved performance and session management
- **Email Integration**: SMTP support with beautiful HTML templates

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Data fetching and caching
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Redis** - In-memory data structure store
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email sending
- **Joi** - Data validation

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer
- **MailHog** - Email testing (development)

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git installed
- Node.js 18+ (for local development)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cryptobloom-saas
```

### 2. Environment Setup
```bash
# Copy environment variables
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

### 3. Start with Docker
```bash
# Build and start all services
npm run docker:up

# Or manually with docker-compose
docker-compose up --build -d
```

### 4. Seed the Database
```bash
# Run the seeding script
docker-compose exec backend npm run seed
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **MailHog (Email Testing)**: http://localhost:8025
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## 👥 Default Accounts

After seeding the database, you can use these accounts:

### Admin Account
- **Email**: admin@cryptobloom.com
- **Password**: admin123
- **Role**: Administrator (full access)

### Moderator Account
- **Email**: moderator@cryptobloom.com
- **Password**: mod123
- **Role**: Moderator (limited admin access)

### Test Users
- **Email**: user1@example.com to user5@example.com
- **Password**: password123
- **Role**: Regular users

## 📁 Project Structure

```
cryptobloom-saas/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # Reusable React components
│   │   ├── contexts/        # React contexts (Auth, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utility functions and API client
│   ├── public/              # Static assets
│   └── Dockerfile           # Frontend container configuration
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/          # MongoDB/Mongoose models
│   │   ├── routes/          # Express route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic services
│   │   └── server.ts        # Main server file
│   ├── scripts/             # Database seeding and utilities
│   └── Dockerfile           # Backend container configuration
├── nginx/                   # Nginx configuration
├── docker-compose.yml       # Multi-container orchestration
└── README.md               # This file
```

## 🔧 Development

### Local Development Setup
```bash
# Install dependencies for both frontend and backend
npm run setup

# Start development servers
npm run dev

# Or start individually
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

### Database Management
```bash
# Seed the database with sample data
npm run seed

# Connect to MongoDB (if running locally)
mongosh mongodb://localhost:27017/cryptobloom
```

### Docker Commands
```bash
# Build containers
npm run docker:build

# Start services
npm run docker:up

# Stop services
npm run docker:down

# View logs
docker-compose logs -f [service-name]
```

## 🌟 Key Features Explained

### 1. Cryptocurrency Trading
- Real-time market data integration
- Buy/sell orders with wallet management
- Portfolio tracking and analytics
- Transaction history and reporting

### 2. Flower Delivery Service
- Curated flower collections
- Shopping cart functionality
- Order tracking and management
- Inventory management system

### 3. Admin Dashboard
- User management and moderation
- Trade monitoring and oversight
- Order fulfillment tracking
- System analytics and reporting

### 4. Email System
- Welcome emails for new users
- Order confirmation notifications
- HTML email templates
- SMTP integration with fallback

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: API endpoint protection
- **CORS Configuration**: Cross-origin request security
- **Input Validation**: Joi schema validation
- **Role-Based Access**: Admin/Moderator/User permissions

## 📊 Monitoring & Analytics

- **Real-time Dashboard**: Live updates and metrics
- **User Analytics**: Registration and activity tracking
- **Trade Monitoring**: Transaction volume and patterns
- **Order Fulfillment**: Delivery tracking and status
- **System Health**: API performance and uptime

## 🚀 Deployment

### Production Deployment
1. **Environment Variables**: Update `.env` with production values
2. **SSL Certificates**: Configure HTTPS in Nginx
3. **Database**: Use MongoDB Atlas or dedicated instance
4. **Email Service**: Configure with SendGrid, Mailgun, etc.
5. **Monitoring**: Set up logging and error tracking

### Scaling Considerations
- **Load Balancing**: Multiple backend instances
- **Database Sharding**: For high-volume data
- **CDN Integration**: Static asset delivery
- **Caching Strategy**: Redis cluster setup
- **Microservices**: Split services as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@cryptobloom.com
- Documentation: [Wiki](wiki-link)

## 🎯 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced trading features (stop-loss, limit orders)
- [ ] AI-powered flower recommendations
- [ ] Multi-language support
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Social features and community
- [ ] Advanced analytics and reporting
- [ ] API for third-party integrations

---

**CryptoBloom** - Where cryptocurrency meets natural beauty 🌸💰