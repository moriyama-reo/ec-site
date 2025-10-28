import Link from "next/link";
export default function CartButton() {
  return (
    <>
      <Link
        href="/cart"
        className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
      >
        🛒 カート
      </Link>
    </>
  );
}
