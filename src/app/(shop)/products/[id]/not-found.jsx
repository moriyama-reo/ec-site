import Link from "next/link";
export default function Notfound() {
  return (
    <div className="text-center mt-8">
      <p className="mb-6">
        お探しの商品は存在しないか、削除された可能性があります。
      </p>
      <Link
        href="/products"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-10 py-2 rounded "
      >
        🡰 商品ページへ戻る
      </Link>
    </div>
  );
}
