import Link from "next/link";

export default function OrderManageButton() {
  return (
    <>
      <Link
        href="../orders"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
      >
        注文管理
      </Link>
    </>
  );
}
