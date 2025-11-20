import CheckoutItemCard from "../../../components/ui/CheckoutItemCard";

export default function CheckoutItmeList({ cartItems }) {
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-10 mt-10">
        {cartItems.itemCount === 0 ? (
          <p className="text-red-500 font-bold ">カートの中身が空です</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cartItems.items.map((cartItem) => (
              <CheckoutItemCard key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
