// pages/api/products/[id].js
import prisma from '../../../lib/dbconnect';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deleted = await prisma.product.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: 'Product deleted', deleted });
    } catch (error) {
      console.error('Delete product error:', error);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
  }

  res.setHeader('Allow', ['DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
