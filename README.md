# Village SACCO 🏦

A full-stack, mobile-first web application providing digital SACCO (Savings and Credit Cooperative) services for rural communities, powered by USDT and blockchain technology through Bitnob APIs.

**Built for Bitnob + Tether Hackathon 2025** 🚀

## 🌟 Features

### For Members
- **USDT Savings** - Secure blockchain-based savings in stable currency
- **Community Loans** - Apply for loans with competitive interest rates
- **Virtual Cards** - Request and manage virtual debit cards for online purchases
- **International Transfers** - Send money globally using USDT with low fees
- **Transaction History** - Track all financial activities in real-time

### For Administrators
- **Member Management** - Approve new members and manage accounts
- **Loan Approval System** - Review and approve/reject loan applications
- **Virtual Card Management** - Create and fund virtual cards for members
- **Financial Oversight** - Monitor savings, loans, and overall SACCO health
- **Dashboard Analytics** - Comprehensive view of SACCO operations

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Prisma ORM** - Type-safe database access
- **SQLite** - Development database (PostgreSQL for production)
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password hashing

### External Services
- **Bitnob API** - Blockchain services for USDT transactions and virtual cards
- **Vercel** - Deployment platform (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VillageSaccoBitnob
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your values:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   BITNOB_API_KEY="your-bitnob-api-key"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npm run db:push      # Create database and apply schema
   npm run db:seed      # Seed with demo data
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

### Admin Access
- **Email**: admin@villagesacco.com
- **Password**: admin123
- **Features**: Full administrative control

### Member Access
- **Email**: member@villagesacco.com  
- **Password**: member123
- **Features**: Member dashboard and services

## 📱 Application Overview

### Landing Page
- Modern, responsive design with Village SACCO branding
- Clear value proposition for rural communities
- Easy navigation to registration and login

### Member Dashboard
- Overview of savings, loans, and virtual cards
- Quick action buttons for common tasks
- Recent transaction history
- Mobile-optimized interface

### Admin Dashboard
- Comprehensive member management
- Loan approval workflow
- Virtual card request handling
- System analytics and reporting

## 🏗️ Project Structure

```
VillageSaccoBitnob/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── auth/              # Auth pages (login/register)
│   │   ├── member/            # Member dashboard
│   │   ├── admin/             # Admin dashboard
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   └── lib/                   # Utility libraries
│       ├── auth.ts            # JWT authentication logic
│       ├── bitnob.ts          # Bitnob API integration
│       └── prisma.ts          # Database client
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Demo data seeding
├── middleware.ts              # Route protection
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # TailwindCSS configuration
└── package.json               # Dependencies and scripts
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Route Protection** - Middleware-based access control
- **Role-Based Access** - Admin and Member permission levels
- **API Security** - Request validation and sanitization

## 🌍 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="production-jwt-secret-256-bit"
BITNOB_API_KEY="live-bitnob-api-key"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with demo data
npm run db:studio    # Open Prisma Studio
```

## 🎨 Design System

### Colors
- **Primary**: Jade Green `#00BB77`
- **Hover**: `#00995F`
- **Success**: Green variations
- **Warning**: Yellow/Orange
- **Error**: Red variations

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible

## 📊 Database Schema

### Key Models
- **User** - Member and admin accounts with authentication
- **Saving** - USDT savings transactions and balances
- **Loan** - Loan applications, approvals, and repayments
- **VirtualCard** - Virtual card requests and management
- **Transaction** - Comprehensive transaction logging

## 🔌 API Integration

### Bitnob API Endpoints
- **Virtual Cards**: Create, fund, and manage cards
- **USDT Transfers**: Send and receive USDT globally
- **Wallet Operations**: Balance checks and transfers
- **Transaction Monitoring**: Real-time transaction status

## 📋 Roadmap

### Completed ✅
- Basic authentication system
- Member and admin dashboards
- Core SACCO operations
- Database schema and seeding
- Responsive UI design

### Next Steps 🔄
- Full Bitnob API integration
- Real-time notifications
- Advanced reporting and analytics
- Production deployment

## 🙏 Acknowledgments

- **Bitnob** - For providing blockchain infrastructure APIs
- **Tether** - For USDT integration and hackathon sponsorship
- **Next.js Team** - For the amazing React framework
- **Vercel** - For deployment and hosting platform

---

**Built with ❤️ for rural communities worldwide** 🌍

*Empowering financial inclusion through blockchain technology*
