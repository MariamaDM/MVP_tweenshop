import Link from 'next/link'
import Image from 'next/image'
export default function ProductCard({product}:{product:any}){
  return (
    <div className="border p-3 rounded">
      <Link href={`/products/${product.id}`}>
        <div className="h-48 w-full relative">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{objectFit:'cover'}} />
        </div>
        <h3 className="mt-2 font-medium">{product.name}</h3>
        <p className="text-sm">{product.category}</p>
        <p className="font-semibold mt-1">{product.price} FCFA</p>
      </Link>
    </div>
  )
}
