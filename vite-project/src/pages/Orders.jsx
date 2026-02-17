// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      setCancellingId(id);
      await API.post(`/orders/${id}/cancel`);
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="page dark-page">
        <div className="container">Loading orders...</div>
      </div>
    );
  }

  const parseMeasurements = (m) => {
    if (!m) return {};
    try {
      return typeof m === "string" ? JSON.parse(m) : m;
    } catch {
      return {};
    }
  };

  return (
    <div className="page dark-page">
      <div className="container">
        <h1 className="page-title">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="muted">No orders yet. Book a tailor from home screen.</p>
        ) : (
          <div className="card-list">
            {orders.map((o) => {
              const m = parseMeasurements(o.measurements);
              return (
                <div key={o.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <h3>Order #{o.id}</h3>
                      <p className="muted small">
                        Placed on: {o.created_at ? o.created_at.slice(0, 10) : "—"}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "3px 8px",
                        borderRadius: 999,
                        background:
                          o.status === "delivered"
                            ? "#022c22"
                            : o.status === "cancelled"
                            ? "#3f1d1d"
                            : "#111827",
                        border:
                          o.status === "delivered"
                            ? "1px solid #22c55e"
                            : o.status === "cancelled"
                            ? "1px solid #f97373"
                            : "1px solid #374151",
                        color:
                          o.status === "delivered"
                            ? "#bbf7d0"
                            : o.status === "cancelled"
                            ? "#fecaca"
                            : "#e5e7eb",
                      }}
                    >
                      {o.status}
                    </span>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <h4 style={{ fontSize: 14, marginBottom: 4 }}>Service</h4>
                    <p className="muted small">
                      {m.serviceType || "—"}
                      {m.description ? ` • ${m.description}` : ""}
                    </p>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <h4 style={{ fontSize: 14, marginBottom: 4 }}>Pickup</h4>
                    <p className="muted small">{m.address || "—"}</p>
                    <p className="muted small">Phone: {m.phone || "—"}</p>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <h4 style={{ fontSize: 14, marginBottom: 4 }}>Measurements</h4>
                    <p className="muted small">
                      Neck: {m.neck || "—"}, Bust: {m.bust || "—"}, Waist:{" "}
                      {m.waist || "—"}, Hip: {m.hip || "—"}, Length:{" "}
                      {m.length || "—"}, Sleeve: {m.sleeve || "—"}
                    </p>
                  </div>

                  {m.notes && (
                    <div style={{ marginTop: 8 }}>
                      <h4 style={{ fontSize: 14, marginBottom: 4 }}>Notes</h4>
                      <p className="muted small">{m.notes}</p>
                    </div>
                  )}

                  {o.status !== "cancelled" && o.status !== "delivered" && (
                    <div style={{ marginTop: 10, textAlign: "right" }}>
                      <button
                        className="btn outline small"
                        onClick={() => handleCancel(o.id)}
                        disabled={cancellingId === o.id}
                      >
                        {cancellingId === o.id ? "Cancelling..." : "Cancel order"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}
