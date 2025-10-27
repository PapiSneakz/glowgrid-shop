'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) return router.replace('/login');
    if (session.user.role !== 'admin') return router.replace('/profile');

    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/analytics');
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error('Analytics fetch error:', err);
      }
    };
    fetchData();
  }, [session, status, router]);

  if (!analytics)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Loading analytics...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        Admin Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Total Sales" value={`$${(analytics.totalSales || 0).toFixed(2)}`} />
        <Card title="Orders" value={analytics.totalOrders || 0} />
        <Card title="Customers" value={analytics.totalCustomers || 0} />
      </div>

      <div className="mt-10 bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-bold text-gray-200 mb-4">Recent Orders</h2>
        <ul className="space-y-3">
          {(analytics.recentOrders || []).map((order) => (
            <li
              key={order.id}
              className="bg-gray-800 rounded-lg p-4 flex justify-between"
            >
              <div>
                <p className="text-gray-300">
                  Order #{order.id} —{' '}
                  <span className="text-indigo-400">{order.user?.email || 'Guest'}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-lg font-semibold">${order.total?.toFixed(2) || 0}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800">
      <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
