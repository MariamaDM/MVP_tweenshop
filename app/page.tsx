'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [adminProducts, setAdminProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchAdminProducts() {
      try {
        const res = await fetch('http://localhost:4000/api/products')
        const data = await res.json()
        setAdminProducts(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des produits admin :", error)
      }
    }
    fetchAdminProducts()
  }, [])

  const featured = adminProducts.slice(0, 3)

  const categories = [
    { name: 'Bébé', key: 'bébé' },
    { name: 'Maternité', key: 'maternité' },
    { name: 'Enfants', key: 'enfants' },
    { name: 'Jouets', key: 'jouets' },
    { name: 'Accessoires', key: 'accessoires' },
  ]

  return (
    <div className="space-y-24 px-4 md:px-8 lg:px-16">

      {/*  Hero Banner  */}
      <section className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="/images/banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 md:px-12">
            <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">
              Bienvenue chez Tweenshop
            </h1>
            <p className="text-white/90 mt-4 text-lg md:text-2xl">
              Mode bébé, maternité & enfants – Livraison rapide
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transform transition-all"
            >
              Découvrir les nouveautés
            </Link>
          </div>
        </div>
      </section>

      {/*  Catégories  */}
      <section>
        <h2 className="text-3xl font-bold mb-8 tracking-tight text-gray-800">Catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat) => {
            const catProducts = adminProducts.filter(
              (p) => p.category.toLowerCase() === cat.key.toLowerCase()
            )
            return (
              <Link
                key={cat.name}
                href={`/products?category=${cat.key}`}
                className={`relative group bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all transform hover:-translate-y-1
                ${catProducts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                  {cat.name}
                </span>
                {catProducts.length > 0 && (
                  <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {catProducts.length}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products  */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Nos produits</h2>

        {featured.length === 0 ? (
          <p className="text-gray-500">Aucun produit ajouté par l’admin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
            {featured.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transform transition-all text-lg font-semibold"
          >
            Voir tout le catalogue
          </Link>
        </div>
      </section>
    </div>
  )
}
