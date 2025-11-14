import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { getOrderDetails } from "../../../../lib/order";

// 注文詳細一覧取得処理
export async function GET(req, { params }) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  const { id: orderId } = await params;

  // オーダー情報取得
  const orderDetails = await getOrderDetails({ orderId });

  if (!orderDetails) {
    return NextResponse.json(
      { error: "オーダー詳細情報がありません" },
      { status: 404 }
    );
  }

  return NextResponse.json(orderDetails, { status: 200 });
}
