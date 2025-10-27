'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

<<<<<<< HEAD
    if (res.error) setError('Invalid credentials');
    else router.push('/');
=======
    setLoading(false);

    if (res.error) return setError('Invalid credentials');
    router.push('/profile');
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white p-6">
<<<<<<< HEAD
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-indigo-700/40">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
=======
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-700/40">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
          Login to GlowGrid
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
<<<<<<< HEAD
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
=======
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
            className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="password"
<<<<<<< HEAD
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
=======
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-semibold"
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
          >
            Login
          </button>
        </form>
<<<<<<< HEAD
        <p className="mt-4 text-center text-gray-400">
=======

        <p className="text-gray-400 text-sm text-center mt-4">
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
          Don’t have an account?{' '}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
