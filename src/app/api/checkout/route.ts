import { NextResponse } from 'next/server';
import stripe from '../../../../lib/stripe';

type Body = { priceId: string; mode: 'payment' | 'subscription'; recipeId?: string };

export async function POST(req: Request) {
    const { priceId, mode, recipeId } = (await req.json()) as Body;

    if (!priceId || !mode) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL;
    let successUrl: string;
    let cancelUrl: string;

    if (mode === 'payment') {
        // Para compras de receta
        successUrl = `${base}/success?mode=payment`;
        // Regresa a la página de la receta
        if (!recipeId) {
            return NextResponse.json({ error: 'Missing recipeId' }, { status: 400 });
        }
        cancelUrl = `${base}/recipes/${recipeId}`;
    } else {
        // Para suscripciones
        successUrl = `${base}/success?mode=subscription`;
        cancelUrl = `${base}/gopro`;
    }

    const session = await stripe.checkout.sessions.create({
        mode,
        line_items: [{ price: priceId, quantity: 1 }],
        payment_method_types: ['card'],
        success_url: successUrl,
        cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
}