"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDeleteButton({ productId }) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  // 商品を削除する（※設計上、オーダー情報と商品が紐づいている場合は削除できない。）
  const handleDelete = async () => {
    setErrorMessage("");

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "商品削除失敗");
      }

      router.push("/products");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="flex justify-center  bg-red-400 hover:bg-red-500 text-white font-bold px-4 py-2 rounded items-center mt-2 max-w-xs mx-auto"
      >
        削除
      </button>
      {errorMessage && (
        <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
          {errorMessage}
        </p>
      )}
    </>
  );
}
