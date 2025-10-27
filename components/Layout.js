'use client';
<<<<<<< HEAD
import React from 'react';
import Header from './Header'; // Fixed import
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
=======

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
>>>>>>> 28f09904e10c81356329cbd79c661e91fbbc407c
  );
}
