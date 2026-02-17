import React, { useEffect, useState } from "react";
import API from "../services/api";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"]
});

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const r = await API.get("/orders");
    setOrders(r.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (orderId, status) => {
    await API.patch(`/orders/${orderId}/status`, { status });

    socket.emit("order_status_update", { orderId, status });

    load();
  };

  return (
    <div className="page dark-page">
      <div className="container">
        <h1 className="page-title">Admin Orders</h1>

        <div className="card-list">
          {orders.map((o) => (
            <div key={o.id} className="card">
              <h3>Order #{o.id}</h3>
              <p className="muted">Current: {o.status}</p>

              <div className="grid-2">
                <button onClick={() => updateStatus(o.id, "confirmed")} className="btn primary">
                  Confirm
                </button>
                <button onClick={() => updateStatus(o.id, "stitching")} className="btn primary">
                  Stitching
                </button>
                <button onClick={() => updateStatus(o.id, "ready")} className="btn primary">
                  Ready
                </button>
                <button onClick={() => updateStatus(o.id, "delivered")} className="btn primary">
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 120 }} />
    </div>
  );
}
