import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { createCartItem } from "../../lib/cart";

export async function POST(req) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }

  const userId = session.user.id;
  const { productId, quantity } = await req.json();

  // DBアクセス（カート登録）
  const cartItem = await createCartItem(userId, productId, quantity);

  // カート合計計算
  const price = Number(cartItem.product.price);
  const subtotal = price * cartItem.quantity;

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        message: "カートに商品を追加しました",
        cartItem: {
          id: cartItem.id,
          product: {
            id: cartItem.product.id,
            name: cartItem.product.name,
            price,
            imageUrl: cartItem.product.images[0]?.imageUrl ?? null,
          },
          quantity: cartItem.quantity,
          subtotal,
        },
      },
    }),
    { status: 200 }
  );
}
