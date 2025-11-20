"use client";

import { useState, useEffect } from "react";
import ProductEditForm from "../../../../../components/forms/ProductEditForm";
import ProductDeleteButton from "./ProductDeleteButton";
import { notFound } from "next/navigation";
import EditProductSkelton from "../../../../../components/ui/EditProductSkelton";

export default function EditProductList({ productId }) {
  const [productDetail, setProductDetail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  // 商品詳細取得
  useEffect(() => {
    const fetchProductDetail = async () => {
      setErrorMessage("");
      setLoading(true);

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

  if (!loading && !productDetail) notFound();

  // カテゴリーデータ取得
  useEffect(() => {
    const fetchcategories = async () => {
      setErrorMessage("");

      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "カテゴリー取得失敗");
        }

        setCategories(data.data.categories);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchcategories();
  }, []);

  return (
    <div>
      {loading ? (
        <EditProductSkelton />
      ) : errorMessage ? (
        <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
          {errorMessage}
        </p>
      ) : !productDetail ? (
        <p className="text-center text-gray-600 mt-6">商品情報はありません</p>
      ) : (
        <>
          <ProductEditForm product={productDetail} categories={categories} />
          <ProductDeleteButton productId={productId} />
        </>
      )}
    </div>
  );
}
