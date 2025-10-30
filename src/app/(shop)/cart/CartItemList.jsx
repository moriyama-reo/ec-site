import React from "react";
import { getCartItems } from "../../lib/cart";
import CartItemCard from "../../../components/ui/CartItemCard";

export default async function CartItemList({ userId }) {
  // DBアクセス
  // const cartItems = await getCartItems(userId);
  // DBから取得したカートアイテムのprice(Decimal)をクライアントに渡せるnumberに変換
  const cartItems = (await getCartItems(userId)).map((item) => ({
    ...item,
    product: { ...item.product, price: item.product.price.toNumber() },
  }));

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cartItems.length === 0 ? (
            <p className="text-red-500 font-bold ">カートの中身が空です</p>
          ) : (
            cartItems.map((cartItem) => (
              <CartItemCard key={cartItem.id} cartItem={cartItem} />
            ))
          )}
        </div>
      </main>
    </>
  );
}
