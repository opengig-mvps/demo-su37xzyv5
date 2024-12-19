import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/modules/stripe';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    if (!sig) {
      throw new Error('Missing Stripe signature');
    }
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const intent = event.data.object;
      const donationId = intent.metadata.donationId;
      const userId = intent.metadata.userId;

      await prisma.donation.updateMany({
        where: { id: donationId, userId },
        data: { paymentStatus: 'succeeded', paymentDate: new Date() },
      });

      const user = await prisma.user.findFirst({ where: { id: userId } });

      if (user) {
        await sendEmail({
          to: user.email,
          template: {
            subject: 'Donation Confirmation',
            html: '<h1>Thank you for your donation!</h1>',
            text: 'Thank you for your donation!',
          },
        });
      }
      break;
    default:
      return NextResponse.json(
        { success: false, message: 'Invalid event type' },
        { status: 400 }
      );
  }

  return NextResponse.json({
    success: true,
    message: 'Webhook processed successfully',
    data: {},
  });
}