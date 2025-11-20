import Image from "next/image";

export default function ProductDetailCard({ product }) {
  return (
    <>
      {product.images && product.images.length > 0 && (
        <div className="relative w-full h-96 mb-6">
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
      <h1 className="font-semibold text-lg mt-1">
        価格: ￥{product.price.toLocaleString()}(税込)
      </h1>
      <p className="mt-1">■商品説明: {product.description}</p>
      <p className="mt-1">在庫数: 残り{product.stock}点</p>
      <p>カテゴリ: {product.category.name}</p>
      <p>販売者: {product.seller.name}</p>
      <p>公開日: {new Date(product.createdAt).toLocaleDateString()}</p>
      <p className="mb-2">
        更新日: {new Date(product.updatedAt).toLocaleDateString()}
      </p>
    </>
  );
}
