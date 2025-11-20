import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import Link from "next/link";
import AdminNotfound from "../edit/not-found";
import EditProductList from "./EditProductList";
import { redirect } from "next/navigation";

export default async function editpage({ params }) {
  const session = await getServerSession(authOptions);

  const { id: productId } = await params;

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "SELLER") {
    return <AdminNotfound />;
  }

  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-4 text-black ">
        商品情報更新
      </p>
      <EditProductList productId={productId} />

      <Link
        href={`/products/${productId}`}
        className="flex justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded items-center mt-2 max-w-xs mx-auto"
      >
        🡰 戻る
      </Link>
    </>
  );
}
