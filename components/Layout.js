'use client';
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
  );
}
