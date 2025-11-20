"use client";

import { useEffect, useState } from "react";
import OrderDetailSkelton from "../../../../components/ui/OrderDetailSkelton";
import OrderDetailsTable from "./OrderDetailsTable";
import OrderItemsTable from "./OrderItemsTable";

export default function OrderDetails({ orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "注文詳細取得失敗");
        }

        setOrderDetails(data.data);
      } catch (err) {
        setErrorMessage(err.message);
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
    setErrorMessage("");

    if (!confirm("ステータスを更新しますか？")) return;

    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "ステータス更新失敗");
      }

      setOrderDetails((prev) => ({ ...prev, status }));
      alert("ステータスの更新が完了しました");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-6">
        {loading ? (
          <OrderDetailSkelton />
        ) : errorMessage ? (
          <p className="text-center text-red-600 font-semibold mt-2 animate-fade-in">
            {errorMessage}
          </p>
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
