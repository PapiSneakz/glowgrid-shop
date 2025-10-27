import prisma from '../../../lib/dbconnect';

export default async function handler(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrders = orders.length;
    const totalCustomers = new Set(orders.map(o => o.userId || o.customerEmail)).size;

    res.status(200).json({
      totalSales,
      totalOrders,
      totalCustomers,
      recentOrders: orders,
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ error: 'Unable to fetch analytics' });
  }
}
