// src/pages/TrackOrder.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import socket from "../services/socket";

const STATUS_STEPS = [
  "pending",
  "confirmed",
  "stitching",
  "ready",
  "delivered"
];

export default function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const loadOrder = async () => {
    try {
      const res = await API.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to load order:", err);
    }
  };

  useEffect(() => {
    loadOrder();

    // Join socket room for this order
    socket.emit("join_room", { room: `order_${id}` });

    // Listen for status updates
    const handleStatusUpdate = (data) => {
      if (data.orderId === Number(id)) {
        setOrder((prev) => ({
          ...prev,
          status: data.status
        }));
      }
    };

    socket.on("order_status_update", handleStatusUpdate);

    return () => {
      socket.off("order_status_update", handleStatusUpdate);
    };
  }, [id]);

  if (!order) {
    return (
      <div className="page">
        <div className="container">Loading order...</div>
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="page">
      <div className="container">

        <h1 className="pageTitle">Track Order #{order.id}</h1>

        <div className="card">
          {STATUS_STEPS.map((step, index) => {
            const done = index <= currentIndex;

            return (
              <div
                key={step}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: done ? "#2563eb" : "#333",
                    marginRight: 10
                  }}
                />

                <span
                  style={{
                    textTransform: "capitalize",
                    opacity: done ? 1 : 0.4
                  }}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}