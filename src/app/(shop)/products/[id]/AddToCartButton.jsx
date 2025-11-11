"use client";
import { useState } from "react";
import Link from "next/link";

export default function AddToCartButton({ productId }) {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      console.log("カート追加成功:", data);
      setMessage(data.data.message);
    } catch (error) {
      console.error("カート追加失敗:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center"
      >
        カートに追加
      </button>
      {message && (
        <>
          <p className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
            {message}
          </p>
          <Link
            href="/cart"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1 rounded inline-flex items-center justify-center mt-2 mb-2"
          >
            カートを見る
          </Link>
        </>
      )}
    </div>
  );
}
