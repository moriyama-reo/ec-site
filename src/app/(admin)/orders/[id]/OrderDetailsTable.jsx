export default function OrderDetailsTable({
  orderDetails,
  handleUpdateStatus,
  status,
  setStatus,
}) {
  return (
    <>
      <p className="flex justify-center items-center text-4xl font-bold mt-4 text-black ">
        注文詳細一覧
      </p>

      <table className="w-full border-collapse border border-gray-300 mt-4 mb-4 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              注文日
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              注文番号
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              注文者
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              合計金額
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              ステータス
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              住所
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-bold">
              支払方法
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={orderDetails.id}>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(orderDetails.createdAt).toLocaleDateString("ja-JP")}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {orderDetails.orderNumber}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {orderDetails.shippingAddress.name}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ￥{Number(orderDetails.total).toLocaleString()}
            </td>
            <td>
              <select
                value={status}
                className="border border-gray-500 px-4 py-2 w-full text-center font-bold rounded focus:outline-none focus:ring focus:ring-gray-600"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">保留</option>
                <option value="CONFIRMED">注文確定</option>
                <option value="SHIPPED">配送済み</option>
                <option value="DELIVERED">配達完了</option>
                <option value="CANCELLED" className="bg-gray-200">
                  キャンセル
                </option>
              </select>
              <button
                className="w-full px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdateStatus}
              >
                更新
              </button>
            </td>
            <td className="border border-gray-300 px-4 py-2 whitespace-pre-line">
              {`〒${orderDetails.shippingAddress.postalCode}\n${orderDetails.shippingAddress.address}\n${orderDetails.shippingAddress.phone}`}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {orderDetails.paymentMethod}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
