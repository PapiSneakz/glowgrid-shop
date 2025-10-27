'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminAnalytics() {
  const { data: session } = useSession();

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-black via-gray-900 to-indigo-900">
        <p className="text-lg text-gray-400 mb-4">Access denied.</p>
        <Link href="/" className="text-indigo-400 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  // your analytics UI here
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold text-indigo-400 mb-6">Admin Analytics</h1>
      {/* your charts, stats, etc */}
    </div>
  );
}
