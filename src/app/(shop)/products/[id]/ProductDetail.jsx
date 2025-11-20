"use client";

import { useState, useEffect } from "react";
import ProductDetailCard from "../../../../components/ui/ProductDetailCard";
import ProductDetailCardSkelton from "../../../../components/ui/ProductDetailCardSkelton";

export default function ProductDetail({ productId }) {
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 商品詳細表示
  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "商品詳細取得失敗");
        }

        setProductDetail(data.data);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId]);

  return (
    <div>
      {loading ? (
        <ProductDetailCardSkelton />
      ) : errorMessage ? (
        <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
          {errorMessage}
        </p>
      ) : productDetail.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">商品詳細はありません</p>
      ) : (
        <div className="container mx-auto shadow-md px-4 py-8 m-2">
          <ProductDetailCard product={productDetail} />
        </div>
      )}
    </div>
  );
}
