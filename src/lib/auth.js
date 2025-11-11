// 認証設定
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// ユーザー取得関数
async function getUser(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

// NextAuth　認証の設定
export const authOptions = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 }, // セッションの有効期限1日
  secret: process.env.NEXTAUTH_SECRET,
  // CredentialsProviderの設定（メアドとパスワードでログインさせるための仕組み）
  providers: [
    CredentialsProvider({
      // ログイン画面のフォームの中身
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Zodでバリデーション
        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        // 認証失敗
        if (!parsedCredentials.success) {
          console.log(parsedCredentials.error.errors);
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // DBからユーザー取得
        const user = await getUser(email);
        if (!user) return null;

        // パスワード照合（bcrypt）
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        // 認証成功 → セッションに含める情報を返す
        return {
          id: user.id,
          name: user.email,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  // セッションに保存
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
