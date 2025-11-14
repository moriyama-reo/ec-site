"use client";

import { useEffect, useState } from "react";
import OrderDetailSkelton from "../../../../components/ui/OrderDetailSkelton";
import OrderDetailsTable from "./OrderDetailsTable";
import OrderItemsTable from "./OrderItemsTable";

export default function OrderDetails({ orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("注文詳細取得失敗");
        const data = await res.json();

        setOrderDetails(data.data.orderDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (orderDetails) {
      setStatus(orderDetails.status);
    }
  }, [orderDetails]);

  const handleUpdateStatus = async () => {
    if (!confirm("ステータスを更新しますか？")) return;
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("ステータス更新失敗");
      const data = await res.json();
      console.log("ステータス更新完了:", data);
      setOrderDetails((prev) => ({ ...prev, status }));
      alert("ステータスの更新が完了しました");
    } catch (err) {
      console.error(err);
      alert("ステータスの更新が失敗しました");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-6">
        {loading ? (
          <OrderDetailSkelton />
        ) : !orderDetails ? (
          <p className="text-center text-gray-600 mt-6">注文詳細はありません</p>
        ) : (
          <>
            {/* 注文詳細一覧  */}
            <OrderDetailsTable
              orderDetails={orderDetails}
              handleUpdateStatus={handleUpdateStatus}
              status={status}
              setStatus={setStatus}
            />
            {/* 注文商品 */}
            <OrderItemsTable orderDetails={orderDetails} />
          </>
        )}
      </div>
    </>
  );
}
