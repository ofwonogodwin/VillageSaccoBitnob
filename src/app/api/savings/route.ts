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

    // Create savings transaction
    const savings = await prisma.transaction.create({
      data: {
        toUserId: decoded.userId,
        type: 'DEPOSIT',
        amount: parseFloat(amount),
        status: 'COMPLETED',
        description: 'Savings deposit'
      }
    });

    return NextResponse.json({ success: true, savings });
  } catch (error) {
    console.error('Savings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // Get total savings
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

    const totalSavings = (deposits._sum?.amount || 0) - (withdrawals._sum?.amount || 0);

    return NextResponse.json({ totalSavings });
  } catch (error) {
    console.error('Get savings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
