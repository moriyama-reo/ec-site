"use client";
import React from "react";
import { useState } from "react";

export default function AddToCartButton({ productId }) {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await res.json();
      console.log("登録成功:", data);
      setMessage(data.data.message);
    } catch (error) {
      console.error("カート登録エラー:", error);
    }
  };

  return (
    <div>
      {/* ADD_CART --> CART */}
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center"
      >
        カートに追加
      </button>
      {/* 🟡 メッセージ表示 */}
      {message && (
        <p className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}
