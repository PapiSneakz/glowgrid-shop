// lib/cartContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('glowgrid_cart')
      if (saved) setItems(JSON.parse(saved))
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('glowgrid_cart', JSON.stringify(items))
    } catch (e) {}
  }, [items])

  function addToCart(product) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id)
      if (idx > -1) {
        const copy = [...prev]
        copy[idx].qty = (copy[idx].qty || 1) + 1
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const totalPrice = items.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
