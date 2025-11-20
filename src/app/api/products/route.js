import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { createProduct } from "../../../lib/product";
import { NextResponse } from "next/server";
import { getProducts } from "../../../lib/product";

// 商品一覧取得・検索結果取得
export async function GET(req) {
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

    // pageをURLから取得
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);

    const limit = 20;
    const search = searchParams.get("search") || "";

    // 商品一覧取得処理
    const { products, totalItems } = await getProducts({ page, limit, search });

    const totalPages = Math.ceil(totalItems / limit);

    if (!products) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PRODUCT_NOT_FOUND",
            message: "商品一覧が見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          products: products.map((product) => ({
            ...product,
            price: Number(product.price),
          })),
          pagination: {
            currentPage: page,
            totalPages,
            totalItems,
            hasNext: page < totalPages,
            hasPrev: page > 1,
            limit,
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
          message: "商品一覧取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}

// 商品登録（販売者のみ）
export async function POST(req) {
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

    if (session.user.role !== "SELLER") {
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

    const body = await req.json();
    const productData = body.formData;

    // 商品登録処理（販売者のみ）
    const newproduct = await createProduct(productData);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newproduct.id,
          name: newproduct.name,
          price: Number(newproduct.price),
          description: newproduct.description,
          imageUrls: newproduct.images?.map((img) => img.imageUrl) ?? null,
          stock: newproduct.stock,
          category: {
            id: newproduct.category.id,
            name: newproduct.category.name,
          },
          createdAt: newproduct.createdAt,
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
          message: "商品登録中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
