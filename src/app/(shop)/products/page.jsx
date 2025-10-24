"use client";
import { signOut } from "next-auth/react";

export default function Productspage() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">商品一覧画面</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          ログアウト
        </button>
      </header>
    </>
  );
}
