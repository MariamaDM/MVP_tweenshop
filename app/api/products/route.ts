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

// GET 
export async function GET() {
  const products = readFile();
  return NextResponse.json(products);
}

// POST 
export async function POST(req: Request) {
  const products = readFile();
  const body = await req.json();

  const newProduct = {
    id: Date.now().toString(),
    ...body,
  };

  products.push(newProduct);
  writeFile(products);

  return NextResponse.json(newProduct);
}
