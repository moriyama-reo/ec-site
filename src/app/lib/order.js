import { prisma } from "./prisma";

async function generateOrderNumber() {
  const year = new Date().getFullYear();

  // 今年の最後のorderNumberを取得
  const lastOrder = await prisma.order.findFirst({
    where: { orderNumber: { startsWith: `ORD-${year}-` } },
    orderBy: { createdAt: "desc" },
  });

  let nextNumber = 1;
  if (lastOrder) {
    // "ORD-2024-005" → 5 を取り出す
    const lastNumber = parseInt(lastOrder.orderNumber.split("-")[2], 10);
    nextNumber = lastNumber + 1;
  }

  // 3桁ゼロ埋め
  const numberStr = String(nextNumber).padStart(3, "0");
  return `ORD-${year}-${numberStr}`;
}

// 1:注文作成（在庫確認➡注文作成）
export async function createOrder(userId, orderData, cartItems) {
  // 在庫確認
  for (const item of cartItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.product.id },
      select: { stock: true },
    });
    if (product.stock < item.quantity) {
      throw new Error(`在庫不足: ${item.product.name}`);
    }
  }
  // オーダー番号作成
  const orderNumber = await generateOrderNumber();
  // orderを作成
  const order = await prisma.Order.create({
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
  // order_items を作成
  const createdItems = [];
  for (const item of cartItems) {
    const orderItem = await prisma.OrderItem.create({
      data: {
        orderId: order.id,
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      },
    });
    createdItems.push(orderItem);
  }

  return { ...order, orderItems: createdItems };
}

// 2:カートアイテム削除
export async function deleteCartItems(userId) {
  await prisma.CartItem.deleteMany({
    where: { userId: userId },
  });
}

// 3:在庫減少（商品の在庫数確認➡在庫ありなら購入
// export async function reduceStock(cartItems) {
//   for (const item of cartItems) {
//     const product = await prisma.product.findUnique({
//       where: { id: item.product.id },
//       select: { stock: true },
//     });
//     if (product.stock < item.quantity) {
//       throw new Error(`在庫不足: ${item.product.name}`);
//     }
//     // await prisma.product.update({
//     //   where: { id: item.product.id },
//     //   data: { stock: { decrement: item.quantity } },
//     // });
//   }
// }
