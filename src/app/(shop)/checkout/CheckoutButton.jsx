export default function CheckoutButton({ onClick }) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        onClick={onClick}
        className="mt-6 bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition-colors"
      >
        注文を確定する
      </button>
    </div>
  );
}
