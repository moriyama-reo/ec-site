import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { NextResponse } from "next/server";
import { updateOrderStatus } from "../../../../../lib/order";

// ステータス更新処理
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  const { status } = await req.json();
  const { id: orderId } = await params;

  const EditOrderStatus = await updateOrderStatus({ orderId, status });

  return NextResponse.json(
    { success: true, data: EditOrderStatus },
    { status: 200 }
  );
}
