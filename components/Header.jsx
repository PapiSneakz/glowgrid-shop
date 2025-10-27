'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const { items = [] } = useCart() || {};
  const router = useRouter();

  const cartCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black/90 backdrop-blur-md text-white shadow-md sticky top-0 z-50 border-b border-indigo-500/20">
      <Link
        href="/"
        className="text-2xl font-bold tracking-wider text-indigo-400 hover:text-indigo-300 transition-all duration-200"
      >
        GlowGrid
      </Link>

      <nav className="flex gap-6 items-center text-sm md:text-base">
        <Link href="/shop" className="hover:text-indigo-400 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-indigo-400 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-indigo-400 transition">
          Contact
        </Link>

        {isAdmin && (
          <Link href="/admin" className="hover:text-yellow-400 transition">
            Admin
          </Link>
        )}

        {user && (
          <Link href="/profile" className="hover:text-indigo-400 transition">
            Profile
          </Link>
        )}

        <Link href="/cart" className="relative flex items-center hover:text-indigo-400 transition">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </Link>

        {!session ? (
          <>
            <Link href="/login" className="hover:text-indigo-400 transition">
              Login
            </Link>
            <Link href="/signup" className="hover:text-indigo-400 transition">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              signOut();
              router.push('/');
            }}
            className="hover:text-red-400 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
