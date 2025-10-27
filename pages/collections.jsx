// pages/collections.jsx
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/collections');
        if (!res.ok) throw new Error('Failed to load collections');
        const data = await res.json();
        setCollections(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-6">Loading collections...</p>;
  if (!collections.length) return <p className="p-6">No collections found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Collections</h1>
      <div className="grid sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collections.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="block bg-white p-4 rounded shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-500 mt-2">{c.count} items</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

