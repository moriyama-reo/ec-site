import Link from "next/link";
import CartItemList from "./CartItemList";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function Cartpage() {
  // セッション取得
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  return (
    <>
      <div>
        <p className="flex justify-center items-center text-4xl font-bold mt-2">
          My CART
        </p>
        <p className="flex justify-center items-center text-gray-400">カート</p>

        {userId ? (
          <CartItemList userId={userId} />
        ) : (
          <>
            <Link
              href="/login"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded inline-flex items-center justify-center"
            >
              <p className="bg-red-500 hover:bg-red-600 ">
                !ログインしてください
              </p>
              ログインへ
            </Link>
          </>
        )}
      </div>
      <Link
        href="/products"
        className="flex justify-center items-center rounded bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 mt-4 w-auto max-w-xs mx-auto"
      >
        買い物を続ける
      </Link>
      <Link
        href="/products"
        className="flex justify-center items-center rounded bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 mt-4 w-auto max-w-xs mx-auto"
      >
        購入
      </Link>
    </>
  );
}
