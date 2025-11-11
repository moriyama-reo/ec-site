import React from "react";
import ProductInfo from "./ProductInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export default async function AdminProduct() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("ログインしてください", { status: 401 });
  }
  const userId = session.user.id;

  return (
    <>
      <ProductInfo userId={userId} />
    </>
  );
}
