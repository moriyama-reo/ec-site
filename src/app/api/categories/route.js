import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { getCategories } from "../../../lib/categories";
import { NextResponse } from "next/server";

export async function GET() {
  // セッション取得
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  // カテゴリー情報取得
  const categories = await getCategories();

  if (!categories) {
    return NextResponse.json(
      { error: "カテゴリー情報がありません" },
      { status: 404 }
    );
  }

  return NextResponse.json(categories, { status: 200 });
}
