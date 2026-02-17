// src/pages/Measurements.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api.js";

export default function Measurements() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const tailorId = searchParams.get("tailorId");

  const [form, setForm] = useState({
    neck: "",
    bust: "",
    waist: "",
    hip: "",
    length: "",
    sleeve: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tailorId) {
      alert("Tailor not specified. Please go back and select a tailor.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/orders", {
        tailor_id: Number(tailorId),
        measurements: form,
      });

      alert("Order placed successfully! You can track it in Orders.");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page dark-page">
      <div className="container">
        <div className="section">
          <h2>Measurements</h2>
          <p className="muted">
            Tailor ID: <b>{tailorId || "—"}</b>
          </p>
          <p className="muted">
            Fill your measurements carefully. You can also add extra notes for
            the tailor.
          </p>
        </div>

        <form className="section form-section" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Neck</label>
              <input
                type="text"
                value={form.neck}
                onChange={(e) => updateField("neck", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Bust / Chest</label>
              <input
                type="text"
                value={form.bust}
                onChange={(e) => updateField("bust", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Waist</label>
              <input
                type="text"
                value={form.waist}
                onChange={(e) => updateField("waist", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Hip</label>
              <input
                type="text"
                value={form.hip}
                onChange={(e) => updateField("hip", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Length</label>
              <input
                type="text"
                value={form.length}
                onChange={(e) => updateField("length", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Sleeve</label>
              <input
                type="text"
                value={form.sleeve}
                onChange={(e) => updateField("sleeve", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Extra Notes for Tailor</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          <button className="btn primary full" type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
      <div style={{ height: 110 }} />
    </div>
  );
}
