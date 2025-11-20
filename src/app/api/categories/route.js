import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { getCategories } from "../../../lib/categories";
import { NextResponse } from "next/server";

// カテゴリ一覧取得
export async function GET() {
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

    // カテゴリ一覧取得処理
    const categories = await getCategories();
    if (!categories) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "カテゴリー情報が見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ...categories,
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
          message: "カテゴリー情報取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
