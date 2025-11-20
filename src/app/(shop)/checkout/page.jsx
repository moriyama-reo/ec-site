import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Link from "next/link";
import CheckoutCartItemList from "./CheckoutCartItemList";
import { redirect } from "next/navigation";

export default async function Checkoutpage() {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role;

  return (
    <>
      <div className="container mx-auto mt-10">
        {userRole === "BUYER" && (
          <>
            <CheckoutCartItemList userRole={userRole} />

            <Link
              href="/cart"
              className="flex justify-center items-center rounded bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 my-4 w-auto max-w-xs mx-auto"
            >
              🡰 カートに戻る
            </Link>
          </>
        )}
      </div>
    </>
  );
}
