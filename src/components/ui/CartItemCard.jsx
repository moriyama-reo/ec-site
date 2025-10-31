"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartItemCard({ cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const router = useRouter();

  // API へ更新リクエスト
  const updateQuantityAPI = async (cartItemId, newQuantity, prevQuantity) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("数量変更失敗");
      const data = await res.json();
      console.log("更新成功:", data);
    } catch (error) {
      console.log(error);
      setQuantity(prevQuantity);
    }
  };
  //Debounce対応する//
  // 数量を減らす
  const handleDecrease = (cartItemId) => {
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) return prevQuantity;
      const newQuantity = prevQuantity - 1;
      // API へ更新
      updateQuantityAPI(cartItemId, newQuantity, prevQuantity);
      // stateを更新
      return newQuantity;
    });
  };

  // 数量を増やす
  const handleIncrease = (cartItemId) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      // API へ更新
      updateQuantityAPI(cartItemId, newQuantity, prevQuantity);
      // stateを更新
      return newQuantity;
    });
  };

  // 商品を削除する
  const handleDelete = async (cartItemId) => {
    // API へ削除リクエスト
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("数量変更失敗");
      const data = await res.json();
      console.log("削除成功:", data);
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border p-4 rounded shadow-md w-auto m-2">
        <div className="w-full h-40 overflow-hidden rounded-t-md">
          <Image
            src={"/" + cartItem.product.images[0].imageUrl}
            alt={cartItem.product.name}
            width={200}
            height={150}
            className="object-cover w-full h-full"
            priority
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
      </div>
    </>
  );
}
