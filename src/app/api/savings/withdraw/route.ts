import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

// POST /api/savings/withdraw - Withdraw from savings
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { amount, currency = 'USDT' } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Check if user has sufficient savings
    const totalSavings = await prisma.saving.aggregate({
      where: { 
        userId: user.userId,
        status: 'COMPLETED'
      },
      _sum: { amount: true }
    })

    const totalWithdrawals = await prisma.transaction.aggregate({
      where: { 
        userId: user.userId,
        type: 'WITHDRAWAL',
        status: 'COMPLETED'
      },
      _sum: { amount: true }
    })

    const availableBalance = (totalSavings._sum.amount || 0) - (totalWithdrawals._sum.amount || 0)

    if (availableBalance < amount) {
      return NextResponse.json({ 
        error: 'Insufficient savings balance',
        availableBalance 
      }, { status: 400 })
    }

    // Create withdrawal transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.userId,
        amount: parseFloat(amount),
        currency,
        type: 'WITHDRAWAL',
        status: 'COMPLETED', // In production, this might start as PENDING
        description: 'Savings withdrawal',
        bitnobTransactionId: `withdrawal_${Date.now()}`, // Mock transaction ID
      }
    })

    return NextResponse.json({ 
      success: true, 
      transaction,
      message: 'Withdrawal completed successfully',
      remainingBalance: availableBalance - amount
    })
  } catch (error) {
    console.error('Error processing withdrawal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
