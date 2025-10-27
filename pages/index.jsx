// pages/index.jsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
        Welcome to GlowGrid
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Illuminate your space with smart LED technology. Explore the GlowGrid
        collection for desks, walls and more.
      </p>
      <Link
        href="/shop"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        Shop Now
      </Link>
    </div>
  );
}

