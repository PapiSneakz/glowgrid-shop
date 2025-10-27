'use client';
import React from 'react';
import Header from './Header'; // ✅ if your header file is Header.jsx
// or if your file is actually named Navbar.jsx, import that instead
// import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Header />   {/* ✅ or <Navbar /> depending on your file name */}
      <main className="min-h-screen bg-gray-50 text-gray-900">{children}</main>
    </>
  );
}

