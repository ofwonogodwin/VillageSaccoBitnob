import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const { amount } = await request.json();

    // Check current balance
    const deposits = await prisma.transaction.aggregate({
      where: {
        toUserId: decoded.userId,
        type: 'DEPOSIT',
        status: 'COMPLETED'
      },
      _sum: {
        amount: true
      }
    });

    const withdrawals = await prisma.transaction.aggregate({
      where: {
        fromUserId: decoded.userId,
        type: 'WITHDRAWAL',
        status: 'COMPLETED'
      },
      _sum: {
        amount: true
      }
    });

    const currentBalance = (deposits._sum?.amount || 0) - (withdrawals._sum?.amount || 0);
    
    if (currentBalance < parseFloat(amount)) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Create withdrawal transaction
    const withdrawal = await prisma.transaction.create({
      data: {
        fromUserId: decoded.userId,
        type: 'WITHDRAWAL',
        amount: parseFloat(amount),
        status: 'COMPLETED',
        description: 'Savings withdrawal'
      }
    });

    return NextResponse.json({ success: true, withdrawal });
  } catch (error) {
    console.error('Withdrawal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
