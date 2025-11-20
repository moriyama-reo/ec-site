import { prisma } from "./prisma";

// 商品一覧取得（ページネーション対応済み）
// 検索ワードが存在する場合は検索に対応し、検索ワードがない場合は全件取得
export async function getProducts({ page = 1, limit = 20, search = "" }) {
  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }
    : {};

  const totalItems = await prisma.product.count({
    where,
  });

  const products = await prisma.product.findMany({
    where,
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
    // スキップ件数
    skip: (page - 1) * limit,
    // 取得件数（デフォルト:20）
    take: limit,
  });
  return { products, totalItems };
}

// 商品詳細取得
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

// 商品登録(販売者用)
export async function createProduct(productData) {
  return await prisma.product.create({
    data: {
      name: productData.name,
      price: parseFloat(productData.price),
      description: productData.description,
      stock: parseInt(productData.stock, 10),
      categoryId: productData.categoryId,
      sellerId: productData.sellerId,
      images: {
        create: [{ imageUrl: productData.imageUrl }],
      },
    },
    include: {
      images: { select: { imageUrl: true } },
      category: { select: { id: true, name: true } },
    },
  });
}

// 商品更新(販売者用)
export async function updateProduct(productEditData, productId) {
  return await prisma.product.update({
    where: { id: productId },
    data: {
      name: productEditData.name,
      price: parseFloat(productEditData.price),
      description: productEditData.description,
      stock: parseInt(productEditData.stock, 10),
      categoryId: productEditData.categoryId,
      images: {
        deleteMany: {},
        create: [{ imageUrl: productEditData.imageUrl }],
      },
    },
    include: {
      category: { select: { id: true, name: true } },
      images: { select: { imageUrl: true } },
    },
  });
}

// 商品削除(販売者用)※productImageは自動で削除される
export async function deleteProduct(productId) {
  return await prisma.product.delete({
    where: { id: productId },
  });
}
