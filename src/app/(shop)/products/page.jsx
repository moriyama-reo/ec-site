import SearchBox from "./SearchBox";
import CartButton from "./CartButton";
import LogoutButton from "./LogoutButton";
import ProductList from "../products/ProductList";
import ProductRegisterButton from "./ProductsNewButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import OrderManageButton from "./OrderManageButton";
import { redirect } from "next/navigation";

export default async function Productspage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role;

  return (
    <>
      <header className="relative flex items-center mb-4 px-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xs md:max-w-md mt-2">
          <SearchBox />
        </div>
        <div className="flex items-center gap-2 ml-auto mt-2">
          {userRole === "SELLER" && (
            <>
              <ProductRegisterButton />
              <OrderManageButton />
            </>
          )}
          {userRole === "BUYER" && <CartButton />}
          <LogoutButton />
        </div>
      </header>
      <main className="flex flex-wrap justify-center items-center md:mt-10 mt-10">
        <h2 className="text-center w-full font-bold text-4xl mb-2">商品一覧</h2>
        <ProductList />
      </main>
    </>
  );
}
