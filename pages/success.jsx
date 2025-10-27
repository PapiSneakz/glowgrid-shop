// pages/success.jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session_id) return;
    setLoading(false);
  }, [session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you — payment received!</h1>
        <p className="text-gray-600 mb-6">Your order is being processed. Check your email for confirmation.</p>
        <button onClick={() => router.push('/shop')} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Continue shopping
        </button>
      </div>
    </div>
  );
}
