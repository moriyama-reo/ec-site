import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { NextResponse } from "next/server";
import ProductEditForm from "../../../../../components/forms/ProductEditForm";
import { getProduct } from "../../../../../lib/product";
import { notFound } from "next/navigation";
import { getCategories } from "../../../../../lib/categories";
import Link from "next/link";
import ProductDeleteButton from "./ProductDeleteButton";

export default async function editpage({ params }) {
  const session = await getServerSession(authOptions);

  const { id: productId } = await params;

  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  if (session.user.role !== "SELLER") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  // クライアントに送るために価格を数字に変更
  const product = await getProduct(productId);
  if (!product) notFound();
  const productForClient = { ...product, price: product.price.toNumber() };

  const categories = (await getCategories()).data.categories;
  if (!categories) {
    return NextResponse.json(
      { error: "カテゴリー情報がありません" },
      { status: 404 }
    );
  }

  return (
    <>
      <ProductEditForm product={productForClient} categories={categories} />
      <ProductDeleteButton productId={productId} />
      <Link
        href={`/products/${productId}`}
        className="flex justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded items-center mt-2 max-w-xs mx-auto"
      >
        🡰 戻る
      </Link>
    </>
  );
}
