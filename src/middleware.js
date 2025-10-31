// ルート保護
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // JWT（セッション情報）を取得
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;

  // ログイン済みユーザーがログインページにアクセスした場合、「/products」にリダイレクト
  if (isLoggedIn && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  // 未ログインユーザーが保護されたページにアクセスした場合、「/login」にリダイレクト
  if (!isLoggedIn && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ログイン済みユーザーが "/"" に来たら /products へ
  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  // 認証OKなら処理続行
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
