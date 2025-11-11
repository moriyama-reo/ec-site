import { prisma } from "./prisma";

// Seller情報を取得
export async function getSellerId(userId) {
  return await prisma.seller.findUnique({
    where: { userId: userId },
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      createdAt: true,
    },
  });
}
