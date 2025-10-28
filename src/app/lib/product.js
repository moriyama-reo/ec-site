import { prisma } from "./prisma";

// 商品一覧を取得
export async function getProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      stock: true,
      createdAt: true,
      images: { select: { imageUrl: true } },
      category: { select: { id: true, name: true } },
      seller: { select: { id: true, name: true } },
    },
  });
}

// 商品詳細を取得
export async function getProduct(id) {
  return await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
      images: { select: { imageUrl: true } },
      category: { select: { id: true, name: true } },
      seller: { select: { id: true, name: true } },
    },
  });
}

// 検索情報を取得
export async function searchProduct(search) {
  const decodedSearch = decodeURIComponent(search);
  const normalizedSearch = decodedSearch.replace(/[\s　]+/g, "").trim();
  const searchWords = normalizedSearch.split(" ").filter(Boolean);

  const filter = searchWords.map((word) => ({
    OR: [
      {
        name: { contains: word },
      },
    ],
  }));
  return await prisma.product.findMany({
    where: { AND: filter },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      stock: true,
      createdAt: true,
      images: { select: { imageUrl: true } },
      category: { select: { id: true, name: true } },
      seller: { select: { id: true, name: true } },
    },
  });
}
