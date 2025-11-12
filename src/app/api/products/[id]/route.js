import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { updateProduct } from "../../../../lib/product";
import { NextResponse } from "next/server";
import { deleteProduct } from "../../../../lib/product";

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const productEditData = body.formData;
  const productId = body.productId;

  const EditProduct = await updateProduct(productEditData, productId);

  return NextResponse.json(
    { success: true, data: EditProduct },
    { status: 200 }
  );
}

export async function DELETE(req, { params }) {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }
  if (session.user.role !== "SELLER") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { id: productId } = await params;

  if (!productId) {
    return NextResponse.json(
      { error: "IDが指定されていません" },
      { status: 400 }
    );
  }

  // DBアクセス（商品削除）
  await deleteProduct(productId);

  return NextResponse.json(
    { success: true, message: "商品を削除しました" },
    { status: 200 }
  );
}
