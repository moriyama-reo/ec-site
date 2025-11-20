"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../../components/ui/ProductCard";
import ProductPagination from "./ProductPagination";
import { useSearchParams } from "next/navigation";
import ProductCardSkelton from "../../../components/ui/ProductCardSkelton";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const search = useSearchParams();
  const query = search.get("search") || "";

  // 商品一覧表示・検索結果表示
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(
          `/api/products?page=${page}${query ? `&search=${query}` : ""}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "商品一覧取得失敗");
        }

        setProducts(data.data.products);
        setHasNext(data.data.pagination?.hasNext ?? false);
        setHasPrev(data.data.pagination?.hasPrev ?? false);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, query]);

  return (
    <div>
      {loading ? (
        <ProductCardSkelton />
      ) : errorMessage ? (
        <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
          {errorMessage}
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">商品はありません</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* ページネーション */}
      <ProductPagination
        hasNext={hasNext}
        hasPrev={hasPrev}
        setPage={setPage}
      />
    </div>
  );
}
