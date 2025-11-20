"use client";
import { useEffect, useState } from "react";
import OrderListSkelton from "../../../components/ui/OrderListSkelton";
import OrderTabale from "./OrderTabale";
import OrderPagination from "./OrderPagination";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(`/api/orders?page=${page}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "注文一覧取得失敗");
        }

        setOrders(data.data.orders);
        setHasNext(data.data.pagination?.hasNext ?? false);
        setHasPrev(data.data.pagination?.hasPrev ?? false);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  return (
    <>
      <div className="max-w-4xl mx-auto mt-6">
        {loading ? (
          <OrderListSkelton />
        ) : errorMessage ? (
          <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
            {errorMessage}
          </p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 mt-6">注文はありません</p>
        ) : (
          //  注文一覧
          <OrderTabale orders={orders} page={page} />
        )}

        {!loading && (
          // ページネーション
          <OrderPagination
            hasNext={hasNext}
            hasPrev={hasPrev}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}
