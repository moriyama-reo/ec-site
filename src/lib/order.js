import { prisma } from "./prisma";

// 注文番号を作成する関数
async function generateOrderNumber(tx) {
  const year = new Date().getFullYear();

  // 今年の最後のorderNumberを1件取得
  const lastOrder = await tx.order.findFirst({
    where: { orderNumber: { startsWith: `ORD-${year}-` } },
    orderBy: { createdAt: "desc" },
  });

  // 取り出した番号を+1
  let nextNumber = 1;
  if (lastOrder) {
    // "ORD-2024-005" → 5 を取り出す
    const lastNumber = parseInt(lastOrder.orderNumber.split("-")[2], 10);
    nextNumber = lastNumber + 1;
  }

  // 3桁ゼロ埋めで返す（例："ORD-2024-005"）
  const numberStr = String(nextNumber).padStart(3, "0");
  return `ORD-${year}-${numberStr}`;
}

// 購入処理（1:在庫確認➡2:注文データ作成➡3:注文アイテム作成➡4:カートアイテム削除）
export async function checkout(userId, orderData, cartItems) {
  // トランザクション開始
  return await prisma.$transaction(async (tx) => {
    // 1:在庫確認
    for (const item of cartItems) {
      const product = await tx.product.findUnique({
        where: { id: item.product.id },
        select: { stock: true },
      });
      if (product.stock < item.quantity) {
        throw new Error(`在庫不足: ${item.product.name}`);
      }
    }

    // オーダー番号作成
    const orderNumber = await generateOrderNumber(tx);

    // 2:orderを作成（注文データ作成）
    const order = await tx.order.create({
      data: {
        userId: userId,
        total: orderData.totalPrice,
        orderNumber: orderNumber,
        shippingAddress: {
          name: orderData.name,
          postalCode: orderData.postalCode,
          address: orderData.address,
          phone: orderData.phone,
        },
        paymentMethod: orderData.paymentMethod,
      },
    });

    // 3:order_items を作成（注文アイテム作成）➡作成後トリガーが動いて在庫減少
    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));
    await tx.orderItem.createMany({ data: orderItems });

    // 4:カートアイテム削除
    await tx.cartItem.deleteMany({ where: { userId: userId } });

    return { ...order, orderItems };
  });
}
