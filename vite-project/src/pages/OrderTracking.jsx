import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const loadOrder = async () => {
    const res = await API.get(`/orders/${id}`);
    setOrder(res.data);
  };

  useEffect(() => {
    loadOrder();

    socket.emit("join_room", { room: `order_${id}` });

    socket.on("order_update", () => {
      loadOrder(); // refresh UI when status updates
    });

    return () => socket.off("order_update");
  }, []);

  if (!order) return <div className="page dark-page">Loading…</div>;

  return (
    <div className="page dark-page">
      <div className="container">
        <h2>Order Tracking</h2>
        <p>Status: <strong>{order.status}</strong></p>

        <h3>Timeline</h3>
        <ul className="muted">
          {order.timeline?.map((step, i) => (
            <li key={i}>
              <strong>{step.status}</strong> — {new Date(step.time).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ height: 110 }} />
    </div>
  );
}
