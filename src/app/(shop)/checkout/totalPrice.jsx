export default function TotalPrice({ totalPrice }) {
  return (
    <div className="text-center mt-6 mb-10 text-lg font-bold">
      合計:￥{totalPrice.toLocaleString()}(税込)
    </div>
  );
}
