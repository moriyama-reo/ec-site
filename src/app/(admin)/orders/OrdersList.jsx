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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders?page=${page}`);
        if (!res.ok) throw new Error("注文一覧取得失敗");
        const data = await res.json();

        setOrders(data.data.orders);
        setHasNext(data.data.pagination?.hasNext ?? false);
        setHasPrev(data.data.pagination?.hasPrev ?? false);
      } catch (error) {
        console.error(err);
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
