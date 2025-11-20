import Link from "next/link";

export default function AdminNotfound() {
  return (
    <div className="text-center mt-8">
      <p className="mb-6">このページを表示する権限がありません</p>
      <Link
        href="/products"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-10 py-2 rounded "
      >
        🡰 商品ページへ戻る
      </Link>
    </div>
  );
}
