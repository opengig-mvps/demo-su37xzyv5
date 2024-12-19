import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { stripeCheckout } from '@/modules/stripe';

type DonationRequestBody = {
  amount: number;
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
};

export async function POST(request: Request) {
  try {
    const body: DonationRequestBody = await request.json();
    const { amount, paymentDetails } = body;

    if (!amount || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields or incorrect format' },
        { status: 400 },
      );
    }

    const session = await stripeCheckout.createOneTimePaymentSession({
      amount: amount * 100, // Stripe expects amount in cents
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    const donation = await prisma.donation.create({
      data: {
        amount,
        paymentStatus: 'pending',
        userId: 'some-user-id', // Replace with actual user ID from authentication context
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Donation initiated successfully',
        data: { sessionId: session.id, sessionUrl: session.url },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error initiating donation:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}