import React from "react";
import Link from "next/link";

export default function Cartpageだよ() {
  return (
    <div>
      Cartページ
      <p>CART --|数量変更ボタンクリック| UPDATE_QUANTITY(数量変更)</p>
      <p>CART --|削除ボタンクリック| REMOVE_ITEM(商品削除) </p>
      {/* <p>CART--|買い物を続けるボタンクリック| PRODUCTS</p> */}
      <Link
        href="/products"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center"
      >
        買い物を続ける
      </Link>
    </div>
  );
}
