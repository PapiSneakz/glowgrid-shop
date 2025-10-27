// pages/cart.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../lib/cartContext';
import axios from 'axios';

export default function CartPage() {
  const { items = [], removeFromCart, clearCart, totalPrice } = useCart() || {};

  // Handle checkout using Stripe
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/api/checkout', { items });
      window.location.href = data.url; // Redirect to Stripe checkout
    } catch (err) {
      console.error('Checkout error:', err);
      alert('There was an issue with checkout. Please try again.');
    }
  };

  if (!items || items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
        <p className="text-gray-400 text-lg">Your cart is empty.</p>
        <Link
          href="/shop"
          className="text-indigo-400 mt-4 hover:underline hover:text-indigo-300 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-400">Your Cart</h1>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-indigo-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image || '/products/placeholder.png'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl shadow-md"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-400">
                  ${(item.price || 0).toFixed(2)} × {item.qty || 1}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-300 hover:underline transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 max-w-3xl mx-auto border-t border-gray-700 pt-6">
        <p className="text-2xl font-semibold">
          Total: <span className="text-indigo-400">${Number(totalPrice || 0).toFixed(2)}</span>
        </p>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition-all shadow-md shadow-red-600/30"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/30"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
