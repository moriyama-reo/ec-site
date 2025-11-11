import Link from "next/link";
export default function ProductRegisterButton() {
  return (
    <>
      <Link
        href="/../products/new"
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 inline-flex items-center"
      >
        商品登録
      </Link>
    </>
  );
}
