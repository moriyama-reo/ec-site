import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { checkout } from "../../../lib/order";
import { getSellerId } from "../../../lib/seller";
import { getOrders } from "../../../lib/order";
import { NextResponse } from "next/server";

// 注文作成
export async function POST(req) {
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

    if (session.user.role !== "BUYER") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "権限がありません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 403 }
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ユーザーIDが指定されていません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    const reqData = await req.json();
    const cartItems = reqData.cartItems.items;

    // 購入処理（トランザクション）
    const order = await checkout(userId, reqData, cartItems);

    return NextResponse.json(
      {
        success: true,
        data: {
          order: {
            id: order.id,
            orderNumber: order.orderNumber,
            status: order.status,
            total: order.total,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            items: order.items.map((item) => ({
              product: item.product,
              quantity: item.quantity,
              subtotal: item.subtotal,
            })),
            createdAt: order.createdAt,
          },
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
          message: "購入処理中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}

// 注文一覧取得
export async function GET(req) {
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

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ユーザーIDが指定されていません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    // 販売者情報取得処理
    const seller = await getSellerId(userId);
    if (!seller) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SELLER_NOT_FOUND",
            message: "販売者情報が見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 404 }
      );
    }
    const sellerId = seller.id;

    // pageをURLから取得
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);

    const limit = 10;

    // 注文一覧取得処理
    const { orders, totalItems } = await getOrders({ sellerId, page, limit });

    const totalPages = Math.ceil(totalItems / limit);

    if (!orders) {
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
          orders: orders.map((order) => ({
            ...order,
            total: Number(order.total),
          })),
          pagination: {
            currentPage: page,
            totalPages,
            totalItems,
            hasNext: page < totalPages,
            hasPrev: page > 1,
            limit,
          },
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
          message: "注文一覧取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
