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
  const [errorMessage, setErrorMessage] = useState("");

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

  // ログイン中の販売者のID取得
  useEffect(() => {
    if (!userId) return;
    const fetchSeller = async () => {
      setErrorMessage("");

      try {
        const res = await fetch(`/api/sellers/${userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "販売者情報取得失敗");
        }
        const sellerId = data.data.id;

        setFormData((prev) => ({ ...prev, sellerId: sellerId }));
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchSeller();
  }, [userId]);

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

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage("");

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

    // 商品登録処理
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "商品登録失敗");
      }

      router.push("/products");
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        router.push("/products/new");
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
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            autoComplete="off"
          />
          価格：
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="price"
            type="number"
            placeholder="1500"
            required
            value={formData.price || ""}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            autoComplete="off"
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
            value={formData.stock || ""}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
          カテゴリー名：
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="categoryId"
            required
            value={formData.categoryId || ""}
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
            value={formData.sellerId || ""}
          />
          商品画像：
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="images"
            required
            value={formData.imageUrl || ""}
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
