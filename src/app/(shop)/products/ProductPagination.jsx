export default function ProductPagination({ hasNext, hasPrev, setPage }) {
  return (
    <>
      <div className="flex justify-center items-center mt-4 mb-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={!hasPrev}
        >
          ← 前へ
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNext}
        >
          次へ →
        </button>
      </div>
    </>
  );
}
