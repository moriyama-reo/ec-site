import { getProduct } from "../../../../lib/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export default async function Productpage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }

  const UserRole = session.user.role;

  return (
    <div className="container mx-auto shadow-md px-4 py-8 w-96 m-2">
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
        価格: ￥{product.price.toNumber().toLocaleString()}(税込)
      </h1>
      <p className="mt-1">■商品説明: {product.description}</p>
      <p className="mt-1">在庫数: {product.stock}</p>
      <p>カテゴリ: {product.category.name}</p>
      <p>販売者: {product.seller.name}</p>
      <p>公開日: {new Date(product.createdAt).toLocaleDateString()}</p>
      <p className="mb-2">
        更新日: {new Date(product.updatedAt).toLocaleDateString()}
      </p>
      <div>
        {UserRole === "BUYER" && <AddToCartButton productId={product.id} />}
        {UserRole === "SELLER" && (
          <Link
            href={`/products/${product.id}/edit`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center mt-2"
          >
            ✏️編集
          </Link>
        )}
      </div>
      <Link
        href="/products"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center mt-2"
      >
        🡰 戻る
      </Link>
    </div>
  );
}
