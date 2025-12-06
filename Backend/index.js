import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = "./data.json";

// Charger la base JSON
function loadData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
}

//  GET tous les produits
app.get("/api/products", (req, res) => {
  const data = loadData();
  res.json(data.products);
});

// GET un produit
app.get("/api/products/:id", (req, res) => {
  const data = loadData();
  const product = data.products.find(p => p.id == req.params.id);
  product ? res.json(product) : res.status(404).json({ error: "Not found" });
});

// POST créer un produit
app.post("/api/products", (req, res) => {
  const data = loadData();
  const newProduct = {
    id: Date.now(),
    ...req.body
  };
  data.products.push(newProduct);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(newProduct);
});

//  PUT modifier un produit
app.put("/api/products/:id", (req, res) => {
  const data = loadData();
  let product = data.products.find(p => p.id == req.params.id);

  if (!product) return res.status(404).json({ error: "Not found" });

  Object.assign(product, req.body);

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(product);
});

//  DELETE supprimer un produit
app.delete("/api/products/:id", (req, res) => {
  const data = loadData();
  data.products = data.products.filter(p => p.id != req.params.id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
