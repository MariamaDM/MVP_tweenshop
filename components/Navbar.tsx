'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'


export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Nom */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="Logo TweenShop"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition">
            TWEENSHOP
          </span>
        </Link>

        {/* Liens navigation */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/products"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Catalogue
          </Link>
          <Link
            href="/admin"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Admin
          </Link>

          {/* Panier */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1 hover:text-blue-600 transition-colors duration-200"
          >
           
            <span>Panier</span>

            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
