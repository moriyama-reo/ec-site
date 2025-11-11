// 初期ユーザー投入（node prisma/seed.jsで実行）
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 全ユーザー削除（クリーンアップ）
  // await prisma.user.deleteMany();

  // ユーザー作成（1人目）
  //   const user = await prisma.user.create({
  //     data: {
  //       id: "user_123",
  //       email: "user@example.com",
  //       password: await bcrypt.hash("password123", 12),
  //     },
  //   });
  //   console.log("登録完了:", { user });

  // ユーザー作成（2人目以降）
  const user2 = await prisma.user.create({
    data: {
      id: "user_456",
      email: "user2@example.com",
      password: await bcrypt.hash("password456", 12),
      role: "SELLER",
    },
  });
  console.log("登録完了:", { user2 });
}

main()
  .catch((e) => {
    console.error("エラー:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
