"use client";
import { useState, useEffect } from "react";
import ProductEditButton from "./ProductEditButton";
import { useRouter } from "next/navigation";

export default function ProductEditForm({ product, categories }) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
    categoryId: product.category.id,
    imageUrl: product.images[0]?.imageUrl,
  });
  const [imageList, setImageList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // 画像データ取得
  useEffect(() => {
    const fetchImages = async () => {
      setErrorMessage("");

      try {
        const res = await fetch("/api/images");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "画像取得失敗");
        }

        setImageList(data.images);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchImages();
  }, []);

  // 商品更新
  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, productId: product.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "商品更新失敗");
      }
      router.push("/products");
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        router.push(`/products/${product.id}/edit`);
      }, 1500);
    }
  };

  return (
    <>
      {errorMessage && (
        <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
          {errorMessage}
        </p>
      )}

      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <form className="flex flex-col w-full gap-2">
          商品名：
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          価格：
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />
          商品説明：
          <textarea
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="description"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          在庫数：
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="stock"
            type="number"
            required
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
          />
          カテゴリー名：
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="categoryId"
            required
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          商品画像：
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="images"
            required
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          >
            {imageList.map((image) => (
              <option key={image} value={image}>
                {image}
              </option>
            ))}
          </select>
          <ProductEditButton onClick={handleClick} />
        </form>
      </div>
    </>
  );
}
