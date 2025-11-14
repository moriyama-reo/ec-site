export default function OrderListSkelton() {
  return (
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
        {[...Array(10)].map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td className="border border-gray-300 px-4 py-3">
              <div className="bg-gray-200 h-4 w-6 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-3">
              <div className="bg-gray-200 h-4 w-24 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-3">
              <div className="bg-gray-200 h-4 w-40 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-3">
              <div className="bg-gray-200 h-4 w-20 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-3">
              <div className="bg-gray-200 h-4 w-24 rounded" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
