import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { createCartItem } from "../../../lib/cart";
import { NextResponse } from "next/server";
import { getCartItems } from "../../../lib/cart";

// カート一覧取得
export async function GET() {
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

    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ユーザーIDが見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    // カート一覧取得処理
    const cartItems = await getCartItems(userId);
    if (!cartItems) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CART_ITEM_NOT_FOUND",
            message: "カートアイテムが見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 404 }
      );
    }

    const items = cartItems.map((cartItem) => {
      const price = Number(cartItem.product.price);
      const subtotal = price * cartItem.quantity;
      return {
        id: cartItem.id,
        product: {
          id: cartItem.product.id,
          name: cartItem.product.name,
          price: price,
          imageUrl: cartItem.product.images?.map((img) => img.imageUrl) ?? null,
        },
        quantity: cartItem.quantity,
        subtotal: subtotal,
      };
    });

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return NextResponse.json(
      {
        success: true,
        data: {
          items,
          total,
          itemCount: items.length,
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
          message: "カート一覧取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}

// カートに商品追加
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

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ユーザーIDが見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "商品IDが見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    // カート登録処理 or カートに商品追加処理
    const cartItem = await createCartItem(userId, productId);

    // カート合計計算
    const price = Number(cartItem.product.price);
    const subtotal = price * cartItem.quantity;

    return NextResponse.json(
      {
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
          message: "カート追加中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
