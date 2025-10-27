// lib/providers.jsx
'use client';
import React from 'react';
import { CartProvider } from './cartContext';

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
