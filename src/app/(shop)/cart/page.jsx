import Link from "next/link";
import CartItemList from "./CartItemList";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";

export default async function Cartpage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role;

  return (
    <>
      <div>
        <p className="flex justify-center items-center text-4xl font-bold mt-2">
          My CART
        </p>
        <p className="flex justify-center items-center text-gray-400">カート</p>
        {userRole === "BUYER" && <CartItemList userRole={userRole} />}
      </div>
      <Link
        href="/products"
        className="flex justify-center items-center rounded bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 mt-4 w-auto max-w-xs mx-auto"
      >
        買い物を続ける
      </Link>
    </>
  );
}
