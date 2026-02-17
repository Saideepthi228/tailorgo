import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function BookTailor() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const tailorId = query.get("id");

  const [tailor, setTailor] = useState(null);
  const [service, setService] = useState("");

  useEffect(() => {
    if (tailorId) {
      API.get(`/tailors/${tailorId}`)
        .then(r => setTailor(r.data))
        .catch(() => setTailor(null));
    }
  }, [tailorId]);

  function continueOrder() {
    if (!service) return alert("Please select service");
    navigate(`/measure?tailor=${tailorId}&service=${service}`);
  }

  if (!tailor) {
    return (
      <div className="page dark-page">
        <div className="container">Loading...</div>
        <div style={{ height: 110 }} />
      </div>
    );
  }

  return (
    <div className="page dark-page">
      <div className="container">
        <h2>Book Tailor</h2>
        <p className="muted">Tailor: {tailor.name}</p>

        <section className="section">
          <h3>Select Service</h3>

          <select
            className="input"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Choose</option>
            <option value="shirt">Stitching - Shirt</option>
            <option value="pant">Stitching - Pant</option>
            <option value="kurta">Stitching - Kurta</option>
            <option value="blouse">Stitching - Blouse</option>
          </select>
        </section>

        <button className="btn primary mt-4" onClick={continueOrder}>
          Continue to Measurements
        </button>
      </div>

      <div style={{ height: 110 }} />
    </div>
  );
}
