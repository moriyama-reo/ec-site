"use client";
import { useRouter } from "next/navigation";

export default function ProductDeleteButton({ productId }) {
  const router = useRouter();
  // 商品を削除する
  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("商品削除失敗");
      const data = await res.json();
      console.log("削除成功:", data);
      router.push("/products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={() => handleDelete(productId)}
      className="flex justify-center  bg-red-400 hover:bg-red-500 text-white font-bold px-4 py-2 rounded items-center mt-2 max-w-xs mx-auto"
    >
      削除
    </button>
  );
}
