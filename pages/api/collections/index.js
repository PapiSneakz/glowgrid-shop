// pages/api/collections/index.js
import prisma from '../../../lib/dbconnect';

export default async function handler(req, res) {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, description: true }
    });

    const buckets = {};

    const mapping = [
      { slug: 'lighting', keywords: ['glow', 'light', 'led', 'aura', 'glowbar', 'lightbar'] },
      { slug: 'desk', keywords: ['desk', 'mat', 'hover', 'charging', 'pad', 'deskmats'] },
      { slug: 'cable', keywords: ['cable', 'link', 'magnetic'] },
      { slug: 'all', keywords: [] }
    ];

    products.forEach((p) => {
      const txt = `${p.name} ${p.description}`.toLowerCase();
      let matched = false;
      for (const m of mapping) {
        if (m.keywords.some(k => txt.includes(k))) {
          buckets[m.slug] = buckets[m.slug] || { name: m.slug.charAt(0).toUpperCase() + m.slug.slice(1), slug: m.slug, count: 0 };
          buckets[m.slug].count += 1;
          matched = true;
        }
      }
      if (!matched) {
        buckets.all = buckets.all || { name: 'All', slug: 'all', count: 0 };
        buckets.all.count += 1;
      }
    });

    buckets.all = buckets.all || { name: 'All', slug: 'all', count: products.length };

    res.status(200).json(Object.values(buckets));
  } catch (error) {
    console.error('Collections API error', error);
    res.status(500).json({ error: 'Unable to fetch collections' });
  }
}
