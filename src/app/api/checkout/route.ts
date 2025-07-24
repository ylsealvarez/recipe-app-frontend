import { NextResponse } from 'next/server';
import stripe from '../../../../lib/stripe';

export async function POST(req: Request) {
  const { priceId } = await req.json();

  console.log('Precio recibido:', priceId);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',         
    line_items: [{ price: priceId, quantity: 1 }],
    payment_method_types: ['card'],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/gopro`,
  });

  console.log('Session creada:', session);

  return NextResponse.json({ url: session.url });
}