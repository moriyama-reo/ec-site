export default function ProductEditButton({ onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex justify-center  bg-blue-400 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded items-center mt-2 max-w-xs mx-auto"
    >
      更新
    </button>
  );
}
