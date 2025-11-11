export default function ProductCardSkelton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded shadow-md w-60 m-2 animate-pulse">
          <div className="bg-gray-200 h-40 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
