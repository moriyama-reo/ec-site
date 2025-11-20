"use client";

import { useEffect, useState } from "react";
import CartItemSkelton from "../../../components/ui/CartItemSkelton";
import CheckoutItmeList from "./CheckoutItmeList";
import TotalPrice from "./totalPrice";
import CustomerInfo from "./CustomerInfo";

export default function CheckoutCartItemList({ userRole }) {
  const [cartItems, setCratItems] = useState({
    itemCount: 0,
    items: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // カート一覧取得
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch("/api/cart");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "カート一覧取得失敗");
        }

        setCratItems(data.data);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-2">
        ご注文内容確認
      </p>
      <main className="flex flex-wrap justify-center items-center md:mt-10 mt-10">
        {loading ? (
          <CartItemSkelton />
        ) : errorMessage ? (
          <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
            {errorMessage}
          </p>
        ) : cartItems.itemCount === 0 ? (
          <p className="text-red-500 font-bold">カートの中身が空です</p>
        ) : (
          <div className="container mx-auto">
            {/* カートの中身 */}
            <CheckoutItmeList cartItems={cartItems} />
            {/* 合計 */}
            <TotalPrice totalPrice={cartItems.total} />
          </div>
        )}
      </main>
      <p className="flex justify-center items-center text-2xl bg-gray-300 font-bold mt-2">
        お客様情報
      </p>
      {/* 購入者情報一覧 */}
      {userRole === "BUYER" && (
        <CustomerInfo
          totalPrice={cartItems.total}
          cartItems={cartItems}
          userRole={userRole}
        />
      )}
    </>
  );
}
