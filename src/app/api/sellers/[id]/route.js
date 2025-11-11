import { getSellerId } from "../../../../lib/seller";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const params = await context.params;
  const userId = params.id;

  if (!userId) {
    return NextResponse.json(
      { error: "ユーザーIDがありません" },
      { status: 400 }
    );
  }

  // SellerId取得処理
  const sellerId = await getSellerId(userId);

  if (!sellerId) {
    return NextResponse.json(
      { error: "販売者情報がありません" },
      { status: 404 }
    );
  }

  return NextResponse.json(sellerId, { status: 200 });
}
