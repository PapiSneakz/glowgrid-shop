// components/Layout.js
'use client';

import React from 'react';
import Header from './Header'; // ✅ Make sure file name is exactly "Header.jsx"
import Footer from './Footer'; // ✅ Optional: ensure Footer.jsx exists

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
