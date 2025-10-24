// 初期ユーザー投入
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 全ユーザー削除（クリーンアップ）
  await prisma.user.deleteMany();

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash("password123", 12);

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      id: "user_123",
      email: "user@example.com",
      password: hashedPassword,
    },
  });
  console.log("登録完了:", { user });
}

main()
  .catch((e) => {
    console.error("エラー:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
