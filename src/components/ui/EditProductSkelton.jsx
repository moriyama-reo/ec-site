export default function EditProductSkelton() {
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6 animate-pulse">
        <form className="flex flex-col w-full gap-2">
          商品名：
          <input className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 animate-pulse" />
          価格：
          <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 animate-pulse" />
          商品説明：
          <textarea className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 animate-pulse" />
          在庫数：
          <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 animate-pulse" />
          カテゴリー名：
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 animate-pulse"></select>
          商品画像：
          <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 animate-pulse"></select>
        </form>
      </div>
    </>
  );
}
