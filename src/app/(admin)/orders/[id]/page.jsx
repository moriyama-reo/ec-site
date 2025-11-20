import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Link from "next/link";
import OrderDetails from "./OrderDetails";
import { redirect } from "next/navigation";

export default async function OrderDetailpage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "SELLER") {
    notFound();
  }

  const { id: orderId } = await params;

  return (
    <>
      <OrderDetails orderId={orderId} />
      <Link
        href={"/orders"}
        className="flex justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded items-center mt-2 max-w-xs mx-auto"
      >
        🡰 戻る
      </Link>
    </>
  );
}
