// pages/api/categories.js
import prisma from '../../lib/dbconnect';

export default async function handler(req, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.status(200).json(categories);
  } catch (e) {
    console.error('Categories API error', e);
    res.status(500).json({ error: 'Unable to fetch categories' });
  }
}
