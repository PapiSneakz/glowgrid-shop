// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import prisma from '../../lib/dbconnect';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { items } = req.body; // items: [{ id, qty, price, name }]
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    const line_items = items.map((it) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: it.name,
          metadata: { productId: String(it.id) },
        },
        unit_amount: Math.round(Number(it.price) * 100),
      },
      quantity: it.qty || 1,
    }));

    // Store cart items (ids & qty) in session metadata as JSON string
    const metadata = { cart: JSON.stringify(items) };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      metadata,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error', err);
    res.status(500).json({ error: 'Failed to create session' });
  }
}
