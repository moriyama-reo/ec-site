import React from "react";
import ProductInfo from "./ProductInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export default async function AdminProduct() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }
  if (session.user.role !== "SELLER") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }
  const userId = session.user.id;

  return (
    <>
      <ProductInfo userId={userId} />
    </>
  );
}
