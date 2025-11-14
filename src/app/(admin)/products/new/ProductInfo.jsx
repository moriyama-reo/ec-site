"use client";
import ProductRegisterButton from "./ProductRegisterButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductInfo({ userId }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
    sellerId: "",
    imageUrl: "",
  });

  // カテゴリーデータ取得
  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("カテゴリー取得失敗");
        const data = await res.json();
        setCategories(data.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchcategories();
  }, []);

  // ログイン中の販売者のID取得
  useEffect(() => {
    if (!userId) return;
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/sellers/${userId}`);
        if (!res.ok) throw new Error("販売者情報取得失敗");
        const data = await res.json();
        setFormData((prev) => ({ ...prev, sellerId: data.id }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeller();
  }, [userId]);

  // 画像データ取得
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) throw new Error("画像取得失敗");
        const data = await res.json();
        setImageList(data.images);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    // いったん、バリデーションをかける（今後はzod使用予定）
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.stock ||
      !formData.categoryId ||
      !formData.sellerId ||
      !formData.imageUrl
    ) {
      alert("全ての項目を入力してください");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) throw new Error("商品登録失敗");
      const data = await res.json();
      console.log("商品登録完了:", data);
      router.push("/products");
    } catch (err) {
      console.error(err);
      router.push("/products/new");
    }
  };

  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-4 text-black ">
        商品情報入力
      </p>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <form className="flex flex-col w-full gap-2">
          商品名：
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="name"
            type="text"
            placeholder="Tシャツ"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          価格：
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="price"
            type="number"
            placeholder="1500"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          商品説明：
          <textarea
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="description"
            placeholder="商品説明"
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
            placeholder="10"
            required
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
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
            <option value="">カテゴリーを選択して下さい</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          販売者ID：
          <input
            className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            name="sellerId"
            readOnly
            value={formData.sellerId}
          />
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
            <option value="">商品画像を選択して下さい</option>
            {imageList.map((image) => (
              <option key={image} value={image}>
                {image}
              </option>
            ))}
          </select>
          <ProductRegisterButton onClick={handleClick} />
        </form>
      </div>
    </>
  );
}
