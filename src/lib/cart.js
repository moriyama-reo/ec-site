import { prisma } from "./prisma";

// カート追加
export async function createCartItem(userId, productId) {
  return await prisma.CartItem.upsert({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: userId,
      productId: productId,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          images: {
            take: 1,
            select: { imageUrl: true },
          },
        },
      },
    },
  });
}

// カートアイテムを取得
export async function getCartItems(userId) {
  return await prisma.CartItem.findMany({
    where: { userId },
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          images: { select: { imageUrl: true } },
        },
      },
    },
  });
}

// 数量変更
export async function updateCartItemQuantity(cartItemId, quantity) {
  return await prisma.CartItem.update({
    where: { id: cartItemId },
    data: {
      quantity: quantity,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          images: { take: 1, select: { imageUrl: true } },
        },
      },
    },
  });
}

// 削除
export async function deleteCartItem(cartItemId) {
  return await prisma.CartItem.delete({
    where: { id: cartItemId },
  });
}
