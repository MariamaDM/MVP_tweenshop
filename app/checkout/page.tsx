'use client'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'

export default function Checkout(){
  const { items, total, clearCart } = useCart()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const WA_NUMBER = '221774720579' 

  const buildMessage = () => {
    if (items.length===0) return ''
    const lines = items.map(it => `${it.quantity}x ${it.name} (${it.price} FCFA)`)
    lines.push(`Total: ${total} FCFA`)
    lines.push(`Nom: ${name}`)
    lines.push(`Téléphone: ${phone}`)
    return encodeURIComponent(lines.join('%0A'))
  }

  const waLink = `https://wa.me/${WA_NUMBER}?text=${buildMessage()}`

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Commander via WhatsApp</h1>
      <p className="mb-4">Remplis tes coordonnées et clique sur <strong>Commander sur WhatsApp</strong>.</p>

      <div className="max-w-md space-y-3">
        <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2" />
        <input placeholder="Téléphone (ex: 77xxxxxxx)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border px-3 py-2" />
        <div>
          <p className="mb-2 font-semibold">Résumé</p>
          <div className="border p-3 rounded">
            {items.map(it => (
              <div key={it.id} className="flex justify-between">
                <div>{it.quantity}x {it.name}</div>
                <div>{it.price * it.quantity} FCFA</div>
              </div>
            ))}
            <div className="mt-2 font-bold">Total: {total} FCFA</div>
          </div>
        </div>

        <a href={waLink} onClick={() => clearCart()} className="inline-block bg-green-600 text-white px-4 py-2 rounded">Commander sur WhatsApp</a>
      </div>
    </div>
  )
}
