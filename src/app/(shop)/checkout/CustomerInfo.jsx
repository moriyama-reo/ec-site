"use client";
import CheckoutButton from "./CheckoutButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerInfo({ totalPrice, cartItems }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    postalCode: "",
    address: "",
    phone: "",
    paymentMethod: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    // いったん、バリデーションをかける（今後はzod使用予定）
    if (
      !formData.name ||
      !formData.postalCode ||
      !formData.address ||
      !formData.phone ||
      !formData.paymentMethod
    ) {
      alert("全ての項目を入力してください");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalPrice, cartItems }),
      });
      if (!res.ok) throw new Error("購入失敗");
      const data = await res.json();
      console.log("注文結果(注文完了！):", data);
      router.push("/orders/complete");
    } catch (error) {
      console.log(error);
      router.push("/cart");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <form className="flex flex-col w-full gap-2">
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="name"
            placeholder="お名前"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="postalCode"
            placeholder="郵便番号"
            required
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="address"
            placeholder="住所"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="phone"
            placeholder="電話番号"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <h2 className="text-xl font-semibold mt-4">支払い方法</h2>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="CREDIT_CARD"
              required
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              className="accent-blue-500"
            />
            クレジットカード
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="BANK_TRANSFER"
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              className="accent-blue-500"
            />
            銀行振込
          </label>
        </form>
      </div>

      <CheckoutButton onClick={handleClick} />
    </>
  );
}
