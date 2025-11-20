import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { updateCartItemQuantity } from "../../../../lib/cart";
import { deleteCartItem } from "../../../../lib/cart";
import { NextResponse } from "next/server";

// カート内商品数量変更
export async function PUT(req, { params }) {
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

    const { id: cartItemId } = await params;
    if (!cartItemId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "カートアイテムIDが見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    const { quantity } = await req.json();

    // カートの数量更新処理
    const updatedCartItem = await updateCartItemQuantity(cartItemId, quantity);

    // カート合計計算
    const price = Number(updatedCartItem.product.price);
    const subtotal = price * updatedCartItem.quantity;

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "数量を更新しました",
          cartItem: {
            id: updatedCartItem.id,
            product: {
              id: updatedCartItem.product.id,
              name: updatedCartItem.product.name,
              price,
              imageUrl: updatedCartItem.product.images[0]?.imageUrl ?? null,
            },
            quantity: updatedCartItem.quantity,
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
          message: "カートの数量更新中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}

// カート内商品削除
export async function DELETE(req, { params }) {
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

    const { id: cartItemId } = await params;
    if (!cartItemId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "カートアイテムIDが見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    // カートの商品削除処理
    await deleteCartItem(cartItemId);

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "カートから商品を削除しました",
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
          message: "カートの商品削除中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
