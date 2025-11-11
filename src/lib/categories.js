import { prisma } from "./prisma";

// カテゴリー情報を取得
export async function getCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
  return { success: true, data: { categories } };
}
