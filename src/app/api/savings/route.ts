import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/auth'

const prisma = new PrismaClient()

// GET /api/savings - Get user's savings
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const savings = await prisma.saving.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ savings })
  } catch (error) {
    console.error('Error fetching savings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/savings - Create new savings deposit
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

    // For demo purposes, we'll create the saving directly
    // In production, this would integrate with Bitnob API
    const saving = await prisma.saving.create({
      data: {
        userId: user.userId,
        amount: parseFloat(amount),
        currency,
        status: 'COMPLETED', // In production, this might start as PENDING
        bitnobTransactionId: `demo_${Date.now()}`, // Mock transaction ID
      }
    })

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: user.userId,
        amount: parseFloat(amount),
        currency,
        type: 'DEPOSIT',
        status: 'COMPLETED',
        description: 'Savings deposit',
        bitnobTransactionId: saving.bitnobTransactionId,
      }
    })

    return NextResponse.json({ 
      success: true, 
      saving,
      message: 'Savings deposit completed successfully' 
    })
  } catch (error) {
    console.error('Error creating saving:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
