import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const isSoldout = product.stock === 0;
  return (
    <div className="border p-4 rounded shadow-md w-60 m-2">
      <Link href={`/products/${product.id}`}>
        {product.images && product.images?.length > 0 && (
          <div className="relative w-full h-40 mb-2">
            <Image
              src={"/" + product.images[0].imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
              unoptimized
            />
          </div>
        )}
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="font-semibold">
          ￥{product.price.toLocaleString()}(税込)
        </p>
        {isSoldout && (
          <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
            売り切れ
          </p>
        )}
      </Link>
    </div>
  );
}
