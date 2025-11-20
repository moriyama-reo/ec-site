export default function OrderItemsTable({ orderDetails }) {
  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-10 text-black ">
        注文商品
      </p>

      <table className="w-full border-collapse border border-gray-300 mt-4 mb-4 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              商品名
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              単価
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              数量
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              小計
            </th>
          </tr>
        </thead>
        <tbody>
          {orderDetails?.items?.map((item) => (
            <tr key={item.product.id}>
              <td className="border border-gray-300 px-4 py-2">
                {item.product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ￥{item.product.price.toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ￥{item.subtotal.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
