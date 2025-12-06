'use client'

import { useEffect, useState } from "react"

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  // Pour mon Formulaire
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: ""
  })

  const API_URL = "http://localhost:4000/api/products"

  // Charger les produits depuis backend
  const loadProducts = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      console.error("Erreur de chargement :", e)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Mise à jour inputs
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Ajouter / Modifier
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const body = { ...form, price: Number(form.price) }
      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const method = editingId ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      // Rafraîchir la liste
      await loadProducts()

      // Reset formulaire
      setEditingId(null)
      setForm({ name: "", price: "", image: "", category: "", description: "" })
    } catch (e) {
      console.error("Erreur lors de l'ajout/modification :", e)
    }
  }

  // Supprimer
  const deleteProduct = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      await loadProducts()
    } catch (e) {
      console.error("Erreur suppression :", e)
    }
  }

  // Éditer
  const editProduct = (p: any) => {
    setForm({
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description
    })
    setEditingId(p.id)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin – Gestion des Produits</h1>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded mb-6">
        <input
          name="name"
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />

        <input
          name="image"
          type="text"
          placeholder="URL de l'image"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />

        <input
          name="category"
          type="text"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {editingId ? "Modifier le produit" : "Ajouter le produit"}
        </button>
      </form>

      {/* LISTE PRODUITS */}
      <h2 className="text-xl font-bold mb-4">Liste des produits</h2>

      <div className="space-y-3">
        {products.length === 0 && <p>Aucun produit.</p>}

        {products.map((p) => (
          <div key={p.id} className="border p-3 rounded flex justify-between">
            <div>
              <p><b>Nom:</b> {p.name}</p>
              <p><b>Prix:</b> {p.price} FCFA</p>
              <p><b>Catégorie:</b> {p.category}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editProduct(p)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Modifier
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
