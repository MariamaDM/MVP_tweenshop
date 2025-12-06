import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

function readFile() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeFile(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

//  un produit-GET
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const products = readFile();
  const product = products.find((p: any) => p.id === params.id);

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  return NextResponse.json(product);
}

//  modifier un produit-PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const products = readFile();
  const body = await req.json();

  const index = products.findIndex((p: any) => p.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  products[index] = { ...products[index], ...body };
  writeFile(products);

  return NextResponse.json(products[index]);
}

// supprimer un produit-delete
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  let products = readFile();

  const index = products.findIndex((p: any) => p.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  products.splice(index, 1);
  writeFile(products);

  return NextResponse.json({ success: true });
}
