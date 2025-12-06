'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('tweenshop_cart')
    if (raw) setItems(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('tweenshop_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const index = prev.findIndex(p => p.id === item.id)
      if (index > -1) {
        const copy = [...prev]
        copy[index].quantity += item.quantity
        return copy
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => setItems(prev => prev.filter(p => p.id !== id))
  const updateQty = (id: string, qty: number) => setItems(prev => prev.map(p => p.id === id ? {...p, quantity: qty} : p))
  const clearCart = () => setItems([])

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <CartContext.Provider value={{items, addToCart, removeFromCart, updateQty, clearCart, total}}>
      {children}
    </CartContext.Provider>
  )
}
