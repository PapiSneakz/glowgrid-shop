// pages/shop.jsx
'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    }
    loadCats();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const q = selectedCat ? `?categoryId=${selectedCat}` : '';
        const res = await fetch(`/api/products${q}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [selectedCat]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">GlowGrid Products</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul>
            <li>
              <button
                onClick={() => setSelectedCat(null)}
                className={`block text-left w-full py-2 ${selectedCat === null ? 'font-bold text-indigo-600' : 'text-gray-700'}`}
              >
                All
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedCat(c.id)}
                  className={`block text-left w-full py-2 ${selectedCat === c.id ? 'font-bold text-indigo-600' : 'text-gray-700'}`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product grid */}
        <section className="md:col-span-3">
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
