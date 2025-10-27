<<<<<<< HEAD
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
=======
// pages/api/admin/analytics.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/dbconnect";

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check session
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    // Fetch analytics
    const totalSalesData = await prisma.order.aggregate({
      _sum: { total: true },
    });

    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count({
      where: { role: "user" },
    });

    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: true }, // include user email for display
    });

    res.status(200).json({
      totalSales: totalSalesData._sum.total || 0,
      totalOrders,
      totalCustomers,
      recentOrders,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
  }
}
