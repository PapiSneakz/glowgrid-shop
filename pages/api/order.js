// pages/api/order.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { items, total, email } = req.body;
    const order = await prisma.order.create({
      data: {
        products: JSON.stringify(items),
        total_usd: total,
        customerEmail: email || null,
        status: 'completed',
      },
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
}
