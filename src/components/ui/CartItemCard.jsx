"use client";
import Image from "next/image";
import { useState } from "react";

export default function CartItemCard({ cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // API へ更新リクエスト
  const updateQuantityAPI = async (cartItemId, newQuantity, prevQuantity) => {
    setErrorMessage("");
    setMessage("");
    setDeleteMessage("");
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "数量変更失敗");
      }
      setMessage("数量変更が完了しました");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setQuantity(prevQuantity);
      setErrorMessage(err.message);
    }
  };

  // 数量を減らす
  const handleDecrease = (cartItemId) => {
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) return prevQuantity;
      const newQuantity = prevQuantity - 1;
      // API へ更新
      updateQuantityAPI(cartItemId, newQuantity, prevQuantity);

      return newQuantity;
    });
  };

  // 数量を増やす
  const handleIncrease = (cartItemId) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      // API へ更新
      updateQuantityAPI(cartItemId, newQuantity, prevQuantity);

      return newQuantity;
    });
  };

  // 商品を削除する
  const handleDelete = async (cartItemId) => {
    setErrorMessage("");
    // API へ削除リクエスト
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "数量変更失敗");
      }
      setDeleteMessage("商品をカートから削除しました");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {errorMessage && (
        <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
          {errorMessage}
        </p>
      )}

      <div className="border p-4 rounded shadow-md w-auto m-2">
        {message && (
          <p className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
            {message}
          </p>
        )}
        {deleteMessage && (
          <p className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
            {deleteMessage}
          </p>
        )}
        {!deleteMessage && cartItem.product.imageUrl?.[0] && (
          <>
            <div className="w-full h-40 overflow-hidden rounded-t-md">
              <Image
                src={"/" + cartItem.product.imageUrl[0]}
                alt={cartItem.product.name}
                width={200}
                height={150}
                className="object-cover w-full h-full"
                priority
                unoptimized
              />
            </div>

            <h2 className="font-bold text-lg">{cartItem.product.name}</h2>
            <p className="font-semibold">
              ￥{cartItem.product.price.toLocaleString()}(税込)
            </p>
            <p>数量：{quantity}</p>

            {/* 数量変更ボタン */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleDecrease(cartItem.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <button
                onClick={() => handleIncrease(cartItem.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              {/* 削除ボタン */}
              <button
                onClick={() => handleDelete(cartItem.id)}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                削除する
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
