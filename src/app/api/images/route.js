import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  // フォルダを開く（絶対パス）
  const imagesDir = path.join(process.cwd(), "public/images");
  try {
    // ディレクトリ内のファイル名を取得
    const files = fs.readdirSync(imagesDir);
    // ファイル名をURLに変換
    const urls = files.map((file) => `images/${file}`);
    return NextResponse.json(
      {
        success: true,
        images: urls,
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
          message: "画像取得中にエラーが発生しました",
          details: err.message,
        },
        meta: { timestamp: new Date().toISOString(), version: "1.0.0" },
      },
      { status: 500 }
    );
  }
}
