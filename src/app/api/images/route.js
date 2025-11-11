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
    return NextResponse.json({ images: urls }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "画像取得に失敗しました" },
      { status: 500 }
    );
  }
}
