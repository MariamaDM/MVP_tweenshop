'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { useSearchParams } from 'next/navigation'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const search = useSearchParams()
  const category = search?.get('category') || ''

  useEffect(() => {
    async function loadProducts() {
      try {
        // REcuperer les produits du backend
        const res = await fetch('http://localhost:4000/api/products')
        const backendProducts = await res.json()

        setProducts(backendProducts)
      } catch (error) {
        console.error("Erreur de chargement des produits :", error)
      }
    }

    loadProducts()
  }, [])

  // Filtrage par catégorie 
  const filtered = category
    ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : products

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Catalogue Admin</h1>

      {category && <p>Filtré par : {category}</p>}

      {filtered.length === 0 ? (
        <p>Aucun produit ajouté par l’admin.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
