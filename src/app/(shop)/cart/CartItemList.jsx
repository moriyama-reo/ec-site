import CartItemCard from "../../../components/ui/CartItemCard";

export default async function CartItemList({ cartItems }) {
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-10 mt-10">
        {cartItems.length === 0 ? (
          <p className="text-red-500 font-bold">カートの中身が空です</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cartItems.map((cartItem) => (
              <CartItemCard key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
