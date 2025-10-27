// pages/api/collections/[slug].js
import prisma from '../../../lib/dbconnect';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    const rules = {
      lighting: ['glow', 'light', 'led', 'aura', 'lightbar', 'glowbars'],
      desk: ['desk', 'mat', 'hover', 'charging', 'pad', 'deskmats'],
      cable: ['cable', 'link', 'magnetic'],
      all: []
    };

    const keywords = rules[slug] || [];

    if (slug === 'all' || keywords.length === 0) {
      const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(products);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: keywords.map((k) => ({
          name: { contains: k, mode: 'insensitive' },
        })).concat(keywords.map((k) => ({
          description: { contains: k, mode: 'insensitive' },
        }))),
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(products);
  } catch (e) {
    console.error('Collections slug API error', e);
    res.status(500).json({ error: 'Unable to fetch products for collection' });
  }
}
