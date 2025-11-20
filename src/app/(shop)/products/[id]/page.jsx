import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import ProductDetail from "./ProductDetail";
import { redirect } from "next/navigation";

export default async function Productpage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const { id: productId } = await params;

  const UserRole = session.user.role;

  return (
    <div className="container mx-auto shadow-md px-4 py-8 w-96 m-2">
      <ProductDetail productId={productId} />
      <div>
        {UserRole === "BUYER" && <AddToCartButton productId={productId} />}
        {UserRole === "SELLER" && (
          <Link
            href={`/products/${productId}/edit`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center mt-2"
          >
            ✏️編集
          </Link>
        )}
      </div>
      <Link
        href="/products"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center mt-2"
      >
        🡰 戻る
      </Link>
    </div>
  );
}
