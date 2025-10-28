import SearchBox from "./SearchBox";
import CartButton from "./CartButton";
import LogoutButton from "./LogoutButton";
import { Suspense } from "react";
import ProductCardSkelton from "../../../components/ui/ProductCardSkelton";
import ProductList from "../products/ProductList";

export default async function Productspage({ searchParams }) {
  return (
    <>
      <header className="relative flex items-center mb-4 px-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xs md:max-w-md mt-2">
          <SearchBox />
        </div>
        <div className="flex items-center gap-2 ml-auto mt-2">
          <CartButton />
          <LogoutButton />
        </div>
      </header>
      <main className="flex flex-wrap justify-center items-center md:mt-10 mt-10">
        <h2 className="text-center w-full font-bold text-4xl mb-2">商品一覧</h2>
        <Suspense fallback={<ProductCardSkelton />}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
