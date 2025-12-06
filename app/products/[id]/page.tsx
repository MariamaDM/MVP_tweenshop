'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCart } from '../../../context/CartContext'

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
 
        const res = await fetch(`http://localhost:4000/api/products/${params.id}`)
        if (!res.ok) throw new Error('Produit introuvable')
        const data = await res.json()
        setProduct(data)
      } catch (e) {
        console.error("Erreur chargement produit :", e)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) return <div>Chargement...</div>
  if (!product) return <div>Produit introuvable</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative h-96">
        <Image
          src={product.image}  
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2">{product.description}</p>
        <p className="mt-4 font-semibold">{product.price} FCFA</p>

        <div className="mt-4 flex items-center gap-2">
          <label>Quantité</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 border px-2 py-1"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: qty,
                image: product.image
              })
            }
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  )
}
