import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session?.user?.role !== "admin") {
      router.push("/");
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [session, status, router]);

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading analytics...</p>;
  if (!analytics) return <p className="text-center mt-20 text-gray-400">No data available.</p>;

  const { totalRevenue, totalOrders, totalProducts, topProducts } = analytics;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">GlowGrid Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg text-gray-400">Total Revenue</h2>
          <p className="text-3xl font-semibold mt-2">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg text-gray-400">Total Orders</h2>
          <p className="text-3xl font-semibold mt-2">{totalOrders}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg text-gray-400">Total Products</h2>
          <p className="text-3xl font-semibold mt-2">{totalProducts}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Top Selling Products</h2>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="pb-2">Product</th>
              <th className="pb-2">Quantity Sold</th>
              <th className="pb-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="py-2">{p.name}</td>
                <td>{p.quantitySold}</td>
                <td>${p.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
