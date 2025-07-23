import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 12)
  const memberPassword = await bcrypt.hash('member123', 12)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@villagesacco.com' },
    update: {},
    create: {
      email: 'admin@villagesacco.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+256 700 000 001',
      role: 'ADMIN',
      isActive: true,
    },
  })

  // Create demo member users
  const member1 = await prisma.user.upsert({
    where: { email: 'member@villagesacco.com' },
    update: {},
    create: {
      email: 'member@villagesacco.com',
      password: memberPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+256 700 000 002',
      role: 'MEMBER',
      isActive: true,
    },
  })

  const member2 = await prisma.user.upsert({
    where: { email: 'jane@villagesacco.com' },
    update: {},
    create: {
      email: 'jane@villagesacco.com',
      password: memberPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+256 700 000 003',
      role: 'MEMBER',
      isActive: true,
    },
  })

  const member3 = await prisma.user.upsert({
    where: { email: 'peter@villagesacco.com' },
    update: {},
    create: {
      email: 'peter@villagesacco.com',
      password: memberPassword,
      firstName: 'Peter',
      lastName: 'Mukasa',
      phone: '+256 700 000 004',
      role: 'MEMBER',
      isActive: false, // Inactive for admin approval demo
    },
  })

  console.log('Demo users created:', { admin, member1, member2, member3 })

  // Create sample savings
  await prisma.saving.createMany({
    data: [
      {
        userId: member1.id,
        amount: 500.00,
        currency: 'USDT',
        status: 'COMPLETED',
        txHash: 'demo_tx_001'
      },
      {
        userId: member1.id,
        amount: 250.00,
        currency: 'USDT',
        status: 'COMPLETED',
        txHash: 'demo_tx_002'
      },
      {
        userId: member2.id,
        amount: 1000.00,
        currency: 'USDT',
        status: 'COMPLETED',
        txHash: 'demo_tx_003'
      },
      {
        userId: member2.id,
        amount: 300.00,
        currency: 'USDT',
        status: 'PENDING',
        txHash: 'demo_tx_004'
      }
    ]
  })

  // Create sample loans
  await prisma.loan.createMany({
    data: [
      {
        userId: member1.id,
        amount: 200.00,
        interest: 5.0,
        reason: 'Small business expansion',
        status: 'PENDING'
      },
      {
        userId: member2.id,
        amount: 500.00,
        interest: 5.0,
        reason: 'Agriculture equipment',
        status: 'APPROVED',
        approvedAt: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      {
        userId: member1.id,
        amount: 100.00,
        interest: 5.0,
        reason: 'Emergency medical expenses',
        status: 'DISBURSED',
        approvedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        disbursedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        disbursedVia: 'wallet',
        txHash: 'demo_loan_tx_001',
        dueDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000) // 23 days from now
      }
    ]
  })

  // Create sample virtual cards
  await prisma.virtualCard.createMany({
    data: [
      {
        userId: member1.id,
        cardId: 'demo_card_001',
        maskedPan: '4532 **** **** 1234',
        expiryMonth: '12',
        expiryYear: '27',
        cvv: '123',
        balance: 150.00,
        currency: 'USD',
        status: 'ACTIVE'
      },
      {
        userId: member2.id,
        status: 'PENDING' // Pending approval
      }
    ]
  })

  // Create sample transactions
  await prisma.transaction.createMany({
    data: [
      {
        fromUserId: member1.id,
        amount: 500.00,
        currency: 'USDT',
        type: 'DEPOSIT',
        status: 'COMPLETED',
        txHash: 'demo_tx_001',
        description: 'Initial savings deposit'
      },
      {
        toUserId: member1.id,
        amount: 100.00,
        currency: 'USDT',
        type: 'LOAN_DISBURSEMENT',
        status: 'COMPLETED',
        txHash: 'demo_loan_tx_001',
        description: 'Emergency loan disbursement'
      },
      {
        fromUserId: member2.id,
        amount: 50.00,
        currency: 'USDT',
        type: 'TRANSFER',
        status: 'COMPLETED',
        txHash: 'demo_transfer_001',
        description: 'International transfer to Kenya'
      }
    ]
  })

  console.log('Demo data seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
