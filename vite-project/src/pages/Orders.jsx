// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="container">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        <h1 className="pageTitle">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="card">
            <p className="muted">No orders yet.</p>

            <button
              className="btn primary"
              onClick={() => navigate("/")}
              style={{ marginTop: 10 }}
            >
              Browse Tailors
            </button>
          </div>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="card" style={{ marginBottom: 14 }}>
              <h3>Order #{o.id}</h3>

              <p className="muted small">
                Status: {o.status}
              </p>

              <div style={{ marginTop: 10 }}>
                <button
                  className="btn outline small"
                  onClick={() => navigate(`/track/${o.id}`)}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}