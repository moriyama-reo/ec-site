import Link from "next/link";
import React from "react";

export default function OrderCompletepage() {
  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-2">
        ご注文ありがとうございました
      </p>
      <Link
        href="/products"
        className="flex justify-center items-center rounded bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 my-4 w-auto max-w-xs mx-auto"
      >
        買い物を続ける
      </Link>
      ;
    </>
  );
}
