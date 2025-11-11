import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { updateCartItemQuantity } from "../../../../lib/cart";
import { deleteCartItem } from "../../../../lib/cart";

export async function PUT(req, { params }) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }

  const cartItemId = params.id;
  const { quantity } = await req.json();

  // DBアクセス（カートの数量更新）
  const updatedCartItem = await updateCartItemQuantity(cartItemId, quantity);

  // カート合計計算
  const price = Number(updatedCartItem.product.price);
  const subtotal = price * updatedCartItem.quantity;

  return new Response(
    JSON.stringify({
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
    }),
    { status: 200 }
  );
}

export async function DELETE(req, { params }) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }

  const cartItemId = params.id;
  if (!cartItemId) {
    return new Response("IDが指定されていません", { status: 400 });
  }

  // DBアクセス（カートの商品削除）
  await deleteCartItem(cartItemId);

  return new Response(
    JSON.stringify({
      success: true,
      message: "カートから商品を削除しました",
    }),
    { status: 200 }
  );
}
