"use client";
import Image from "next/image";

export default function CheckoutItemCard({ cartItem }) {
  const quantity = cartItem.quantity;

  return (
    <>
      <div className="border p-4 rounded shadow-md w-auto m-2">
        <div className="w-full h-40 overflow-hidden rounded-t-md">
          <Image
            src={"/" + cartItem.product.images[0].imageUrl}
            alt={cartItem.product.name}
            width={200}
            height={150}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h2 className="font-bold text-lg">{cartItem.product.name}</h2>
        <p className="font-semibold">
          ￥{cartItem.product.price.toLocaleString()}(税込)
        </p>
        <p>数量：{quantity}</p>
      </div>
    </>
  );
}
