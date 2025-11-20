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

    const items = cartItems.map((item) => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
      },
      quantity: item.quantity,
      subtotal: item.quantity * item.product.price,
    }));

    return { ...order, items };
  });
}

// 注文一覧を取得（ページネーション対応済み）
export async function getOrders({ sellerId, page = 1, limit = 10 }) {
  const totalItems = await prisma.order.count({
    where: {
      orderItems: { some: { product: { sellerId: sellerId } } },
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          product: {
            sellerId: sellerId,
          },
        },
      },
    },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      total: true,
      createdAt: true,
    },
    // スキップ件数
    skip: (page - 1) * limit,
    // 取得件数（デフォルト:10）
    take: limit,
  });
  return { orders, totalItems };
}

// 注文詳細一覧を取得
export async function getOrderDetails({ orderId }) {
  const orderDetails = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      total: true,
      shippingAddress: true,
      paymentMethod: true,
      createdAt: true,
      updatedAt: true,
      orderItems: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          quantity: true,
        },
      },
    },
  });

  // subtotalを計算してorderItemsに追加
  const subtotal = orderDetails.orderItems.map((item) => ({
    ...item,
    subtotal: Number(item.product.price) * Number(item.quantity),
  }));

  return {
    ...orderDetails,
    orderItems: subtotal,
  };
}

// ステータス更新
export async function updateOrderStatus({ orderId, status }) {
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      status: status,
    },
  });
}
