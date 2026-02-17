import React, { useState } from "react";
import API from "../services/api";

export default function TestStatusUpdate() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const update = async () => {
    await API.post("/tracking/update", { order_id: orderId, status });
    alert("Status updated!");
  };

  return (
    <div className="page dark-page">
      <div className="container">
        <h2>Update Order Status</h2>

        <input
          className="input"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <select className="input" onChange={(e) => setStatus(e.target.value)}>
          <option>Select status</option>
          <option value="Tailor Accepted">Tailor Accepted</option>
          <option value="Stitching Started">Stitching Started</option>
          <option value="Stitching Completed">Stitching Completed</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button className="btn primary full" onClick={update}>
          Update
        </button>
      </div>
    </div>
  );
}
