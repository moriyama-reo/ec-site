"use client";
import React from "react";

export default function AddToCartButton(productId) {
  const handleClick = () => {
    alert("商品がカートに追加されました");
  };

  return (
    <div>
      {/*  PRODUCT_DETAIL -->|カートに追加ボタンクリック| ADD_CART(カートに追加) */}
      {/* ADD_CART --> CART */}
      {/* API 経由で CartItem を作成 */}
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center"
      >
        カートに追加
      </button>
    </div>
  );
}
