<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Village SACCO Project Instructions

This is a full-stack Next.js application for a Village SACCO (Savings and Credit Cooperative) system built for the Bitnob + Tether Hackathon 2025.

## Project Context

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes with Prisma ORM  
- **Database**: SQLite (for demo), PostgreSQL (production)
- **Authentication**: JWT with bcryptjs
- **3rd-Party APIs**: Bitnob APIs for wallets, virtual cards, and USDT transfers
- **UI Icons**: Lucide React icons

### Project Structure
- `/src/app` - Next.js App Router pages and API routes
- `/src/lib` - Utility libraries (auth, prisma, bitnob)
- `/src/components` - Reusable React components
- `/prisma` - Database schema and migrations

### Key Features
1. **Authentication System** - JWT-based with role-based access (ADMIN/MEMBER)
2. **Member Dashboard** - Savings, loans, virtual cards, transfers
3. **Admin Dashboard** - Member management, loan approvals, system oversight
4. **SACCO Operations** - USDT savings, community loans, virtual card management
5. **Bitnob Integration** - Blockchain-based USDT transactions and virtual cards

### Branding Guidelines
- **Primary Color**: Jade Green `#00BB77`
- **Hover Color**: `#00995F` 
- **Theme**: Mobile-first, clean, professional
- **Typography**: Inter font family

### Database Models
- **User** - Members and admins with authentication
- **Saving** - USDT savings deposits and withdrawals
- **Loan** - Community loan applications and management
- **VirtualCard** - Card requests and management
- **Transaction** - All financial transaction records

### Authentication Flow
- Registration creates MEMBER role by default
- Admin accounts must be seeded manually
- JWT tokens stored in httpOnly cookies
- Middleware protects routes based on roles

### API Integration
- Bitnob service class in `/src/lib/bitnob.ts`
- Environment variables for API keys
- Error handling for external API calls
- Mock responses for demo purposes

### Development Guidelines
1. Use TypeScript for all new files
2. Follow Next.js 15 App Router conventions
3. Implement proper error handling
4. Use Tailwind utility classes for styling
5. Maintain consistent file naming conventions
6. Add proper type definitions for API responses

### Demo Data
- Admin: admin@villagesacco.com / admin123
- Member: member@villagesacco.com / member123
- Additional test users with various statuses
- Sample transactions, loans, and cards for testing

When working on this project, prioritize:
1. Mobile-responsive design
2. Type safety with TypeScript
3. Clean, maintainable code structure
4. Proper error handling and validation
5. Secure authentication practices
