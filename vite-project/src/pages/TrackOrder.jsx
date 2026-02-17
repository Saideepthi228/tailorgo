import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import API from "../services/api";

const socket = io("http://localhost:5000");

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
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrder();

    // Join order socket room
    socket.emit("join_room", { room: `order_${id}` });

    socket.on("order_status_update", (data) => {
      if (data.orderId === Number(id)) {
        setOrder((prev) => ({ ...prev, status: data.status }));
      }
    });

    return () => socket.off("order_status_update");
  }, [id]);

  if (!order)
    return (
      <div className="page dark-page">
        <div className="container">Loading order...</div>
      </div>
    );

  return (
    <div className="page dark-page">
      <div className="container">
        <h1 className="page-title">Track Order #{order.id}</h1>

        {/* AMAZON-LIKE TIMELINE */}
        <div className="timeline">
          {STATUS_STEPS.map((step, index) => {
            const isDone = STATUS_STEPS.indexOf(order.status) >= index;

            return (
              <div key={step} className={`timeline-step ${isDone ? "done" : ""}`}>
                <div className="dot"></div>
                <div className="label">{step}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>Current Status:</h3>
          <p className="muted">{order.status}</p>
        </div>

        <div className="section">
          <h3>Measurements</h3>
          <pre className="muted" style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(order.measurements, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ height: 110 }} />
    </div>
  );
}
