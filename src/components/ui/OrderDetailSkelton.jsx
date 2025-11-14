export default function OrderDetailSkelton() {
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
          <tr className="animate-pulse">
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-6 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-24 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-40 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-20 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-24 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-6 rounded" />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="bg-gray-200 h-4 w-6 rounded" />
            </td>
          </tr>
        </tbody>
      </table>

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
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="border border-gray-300 px-4 py-2">
                <div className="bg-gray-200 h-4 w-24 rounded" />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="bg-gray-200 h-4 w-24 rounded" />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="bg-gray-200 h-4 w-24 rounded" />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="bg-gray-200 h-4 w-24 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
