import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { createOrder, deleteCartItems } from "../../lib/order";

export async function POST(req) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }
  const userId = session.user.id;
  const reqData = await req.json();

  // 1:注文作成
  const order = await createOrder(userId, reqData, reqData.cartItems);

  // 2:カートアイテム削除
  await deleteCartItems(userId);

  // 3:在庫減少➡トリガーで自動で在庫を減らしてくれるのでコメントアウト
  // await reduceStock(reqData.cartItems);

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          total: order.total,
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          items: order.orderItems.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            subtotal: item.quantity * item.price,
          })),
          createdAt: order.createdAt,
        },
      },
    }),
    { status: 200 }
  );
}
