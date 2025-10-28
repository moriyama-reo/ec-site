import { getProducts, searchProduct } from "../../lib/product";
import ProductCard from "../../../components/ui/ProductCard";

export default async function ProductList({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.search || "";

  // DBアクセス
  const products = query
    ? // 検索結果表示
      await searchProduct(query)
    : // 商品一覧表示
      await getProducts();

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-8">
        検索結果が見つかりません
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
