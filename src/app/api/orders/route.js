import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { checkout } from "../../../lib/order";
import { getSellerId } from "../../../lib/seller";
import { getOrders } from "../../../lib/order";
import { NextResponse } from "next/server";

export async function POST(req) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }
  const userId = session.user.id;
  const reqData = await req.json();

  // 購入処理（トランザクション）
  const order = await checkout(userId, reqData, reqData.cartItems);

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

// 注文一覧取得処理
export async function GET(req) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  // セッションIDを取得
  const sellerId = (await getSellerId(userId)).id;

  // pageを取り出す
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);

  // オーダー情報取得
  const orders = await getOrders({ sellerId, page });

  if (!orders) {
    return NextResponse.json(
      { error: "オーダー情報がありません" },
      { status: 404 }
    );
  }

  return NextResponse.json(orders, { status: 200 });
}
