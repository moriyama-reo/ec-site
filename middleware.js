// ルート保護
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      // ログイン済みユーザーがログインページにアクセスした場合、「/products」にリダイレクト
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/products", nextUrl));
      }

      // 未ログインユーザーが保護されたページにアクセスした場合、「/login」にリダイレクト
      if (!isLoggedIn && nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", nextUrl));
      }

      // 認証
      return true;
    },
  },
});
