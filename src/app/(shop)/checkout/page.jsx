import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import CheckoutItmeList from "./CheckoutItmeList";
import Link from "next/link";
import { getCartItems } from "../../../lib/cart";
import TotalPrice from "./totalPrice";
import CustomerInfo from "./CustomerInfo";

export default async function Checkoutpage() {
  // セッション取得
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // DBアクセス（カートの内容を取得）
  const cartItems = (await getCartItems(userId)).map((item) => ({
    ...item,
    product: { ...item.product, price: item.product.price.toNumber() },
  }));

  // カート合計計算
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
  });

  const UserRole = session.user.role;

  return (
    <>
      <div className="container mx-auto mt-10">
        <p className="flex justify-center items-center text-4xl font-bold mt-2">
          ご注文内容確認
        </p>
        {/* カートの中身 */}
        <CheckoutItmeList cartItems={cartItems} />
        {/* 合計 */}
        <TotalPrice totalPrice={totalPrice} />

        <p className="flex justify-center items-center text-2xl bg-gray-300 font-bold mt-2">
          お客様情報
        </p>
        {/* 購入者情報一覧 */}
        <CustomerInfo totalPrice={totalPrice} cartItems={cartItems} />
        {UserRole === "BUYER" && (
          <Link
            href="/cart"
            className="flex justify-center items-center rounded bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 my-4 w-auto max-w-xs mx-auto"
          >
            🡰 カートに戻る
          </Link>
        )}
      </div>
    </>
  );
}
