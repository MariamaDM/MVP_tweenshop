'use client'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

export default function CartPage(){
  const { items, removeFromCart, updateQty, total } = useCart()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {items.length===0 ? (
        <div>
          <p>Votre panier est vide.</p>
          <Link href="/products" className="mt-2 inline-block text-blue-600">Voir le catalogue</Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {items.map(it => (
              <div key={it.id} className="flex items-center gap-4 border p-3 rounded">
                <img src={it.image} alt={it.name} className="w-24 h-24 object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium">{it.name}</h3>
                  <p>{it.price} FCFA</p>
                </div>
                <div>
                  <input type="number" min={1} value={it.quantity} onChange={e => updateQty(it.id, Number(e.target.value))} className="w-20 border px-2 py-1" />
                </div>
                <div>
                  <button onClick={() => removeFromCart(it.id)} className="text-red-600">Supprimer</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="font-semibold">Total: {total} FCFA</p>
            <Link href="/checkout" className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded">Commander</Link>
          </div>
        </div>
      )}
    </div>
  )
}
