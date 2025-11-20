import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { getSellerId } from "../../../../lib/seller";
import { NextResponse } from "next/server";

// 販売者プロフィール取得
export async function GET(req, context) {
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

    const params = await context.params;
    const userId = params.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ユーザーIDが指定されていません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 400 }
      );
    }

    // 販売者情報取得処理
    const sellerId = await getSellerId(userId);
    if (!sellerId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SELLER_NOT_FOUND",
            message: "販売者情報が見つかりません",
          },
          meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: sellerId,
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
          message: "販売者情報取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
