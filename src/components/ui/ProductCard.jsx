import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow-md w-60 m-2">
      <Link href={`/products/${product.id}`}>
        {product.images && product.images.length > 0 && (
          <div className="relative w-full h-40 mb-2">
            <Image
              src={"/" + product.images[0].imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="font-semibold">
          ￥{product.price.toNumber().toLocaleString()}(税込)
        </p>
      </Link>
    </div>
  );
}
