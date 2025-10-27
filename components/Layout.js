'use client';

import React from 'react';

import { CartProvider } from './CartContext';

export default function Layout({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <main>{children}</main>
        <footer className="mt-12 border-t text-sm text-gray-500 py-6 text-center">
          © {new Date().getFullYear()} GlowGrid
        </footer>
      </div>
    </CartProvider>
  );
}

