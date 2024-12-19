import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    const donations = await prisma.donation.findMany({
      where: { userId: userId },
      select: {
        id: true,
        amount: true,
        paymentStatus: true,
        paymentDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Donation history fetched successfully',
        data: donations,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error fetching donation history:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}