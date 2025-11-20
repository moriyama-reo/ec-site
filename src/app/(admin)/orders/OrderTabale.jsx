import { useRouter } from "next/navigation";

export default function OrderTabale({ orders, page }) {
  const router = useRouter();

  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-4 text-black ">
        注文一覧
      </p>

      <table className="w-full border-collapse border border-gray-300 mt-4 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              No
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              注文日
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              注文番号
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              金額
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              ステータス
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/orders/${order.id}`)}
            >
              <td className="border border-gray-300 px-4 py-2">
                {(page - 1) * 10 + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.createdAt).toLocaleDateString("ja-JP")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.orderNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ￥{order.total.toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
