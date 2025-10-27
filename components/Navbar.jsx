'use client';

import Link from 'next/link';
import { useCart } from '../lib/cartContext';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="font-bold text-xl">GlowGrid</Link>

      <div className="flex items-center gap-4">
        {/* Shop link now points to the new shop page */}
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        <Link href="/cart" className="relative">
          <ShoppingCart size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
