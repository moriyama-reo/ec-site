import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { createProduct } from "../../../lib/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const productData = body.formData;

  // 商品登録処理
  const newproduct = await createProduct(productData);

  if (!newproduct) {
    return NextResponse.json(
      { error: "商品登録ができませんでした" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { success: true, data: newproduct },
    { status: 200 }
  );
}
