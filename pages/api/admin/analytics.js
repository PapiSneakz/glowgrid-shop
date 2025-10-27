import prisma from "../../../lib/dbconnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();

    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
      },
    });

    let totalRevenue = 0;
    const productSales = {};

    orders.forEach(order => {
      totalRevenue += order.total;
      order.items.forEach(item => {
        const { name, price } = item.product;
        if (!productSales[name]) {
          productSales[name] = { quantitySold: 0, revenue: 0 };
        }
        productSales[name].quantitySold += item.quantity;
        productSales[name].revenue += item.quantity * price;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalProducts,
      topProducts,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to load analytics" });
  }
}
