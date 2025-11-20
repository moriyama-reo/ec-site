import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { getOrderDetails } from "../../../../lib/order";

// 注文詳細取得
export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "AUTHENTICATION_FAILED",
            message: "ログインしてください",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 401 }
      );
    }

    const { id: orderId } = await params;
    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "オーダーIDが指定されていません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    // 注文詳細取得処理
    const orderDetails = await getOrderDetails({ orderId });
    if (!orderDetails) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ORDER_NOT_FOUND",
            message: "オーダー情報が見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: orderDetails.id,
          orderNumber: orderDetails.orderNumber,
          status: orderDetails.status,
          total: Number(orderDetails.total),
          shippingAddress: orderDetails.shippingAddress,
          paymentMethod: orderDetails.paymentMethod,
          items: orderDetails.orderItems.map((item) => ({
            product: { ...item.product, price: Number(item.product.price) },
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
          createdAt: orderDetails.createdAt,
          updatedAt: orderDetails.updatedAt,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "注文詳細取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
