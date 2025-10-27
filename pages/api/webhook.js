// pages/api/webhook.js
import Stripe from 'stripe';
import prisma from '../../lib/dbconnect';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Read cart from metadata
    const cartJson = session.metadata?.cart;
    let items = [];
    try {
      items = JSON.parse(cartJson || '[]');
    } catch (e) {
      console.error('Failed to parse cart metadata', e);
    }

    try {
      // Create order in DB
      const order = await prisma.order.create({
        data: {
          total: (session.amount_total || 0) / 100,
          status: 'completed',
          customerEmail: session.customer_details?.email || session.customer_email || null,
          items: {
            create: items.map((it) => ({
              quantity: it.qty || 1,
              product: { connect: { id: Number(it.id) } },
            })),
          },
        },
      });

      console.log('Order created:', order.id);
    } catch (e) {
      console.error('Failed to create order in DB', e);
    }
  }

  res.status(200).json({ received: true });
}
