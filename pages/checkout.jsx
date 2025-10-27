'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/cartContext';

export default function CheckoutPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Thank you for your purchase ✨</h1>
      <p className="text-gray-400 mb-8">Your order has been placed successfully.</p>
      <Link
        href="/shop"
        className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg text-white transition-all duration-300 shadow-lg shadow-indigo-500/30"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
