// pages/api/products.js
import prisma from '../../lib/dbconnect';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      // 🟢 GET all products
      case 'GET': {
        const products = await prisma.product.findMany({
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            createdAt: true,
          },
        });
        return res.status(200).json(products);
      }

      // 🟣 POST create new product
      case 'POST': {
        const { name, price, description, image } = req.body;

        if (!name || !price || !description) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProduct = await prisma.product.create({
          data: {
            name,
            price: parseFloat(price),
            description,
            image: image || '/products/placeholder.png',
          },
        });

        return res.status(201).json(newProduct);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
