// PrismaClientのシングルトン（使い回し）設定
import { PrismaClient } from "@prisma/client";

// グローバルスコープでPrismaインスタンスを保持する場所の作成
const globalForPrisma = globalThis;

// Prismaインスタンスがあればそれを使用する、なければ作成する
export const prisma = globalForPrisma.prisma || new PrismaClient();

// 開発環境のみ
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
