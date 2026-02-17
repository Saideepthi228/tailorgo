// src/pages/TailorDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Phone, MessageCircle, Star, MapPin } from "lucide-react";

export default function TailorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tailor, setTailor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/tailors/${id}`)
      .then((res) => setTailor(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load tailor");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page dark-page">
        <div className="container">Loading tailor...</div>
      </div>
    );
  }

  if (!tailor) {
    return (
      <div className="page dark-page">
        <div className="container">Tailor not found.</div>
      </div>
    );
  }

  const handleBook = () => {
    navigate(`/order/${tailor.id}`, { state: { tailor } });
  };

  const handleChat = () => {
    navigate("/chat", { state: { tailorId: tailor.id } });
  };

  return (
    <div className="page dark-page">
      <div className="container">
        {/* Header card */}
        <div className="card">
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 18,
                background: "#020617",
                border: "1px solid #1f2937",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              🧵
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ marginBottom: 6 }}>{tailor.name}</h2>
              <p className="muted" style={{ marginBottom: 6 }}>
                {tailor.bio || "Experienced tailor for all stitching needs."}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  fontSize: 13,
                  color: "#a3a3a3",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={14} color="#facc15" /> {tailor.rating || "New"}
                </span>
                <span>|</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={14} /> {tailor.location || "Nearby"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 10,
            marginBottom: 14,
          }}
        >
          <button className="btn outline" style={{ flex: 1 }} onClick={handleChat}>
            <MessageCircle size={16} style={{ marginRight: 6 }} />
            Chat
          </button>
          <button className="btn outline" style={{ flex: 1 }}>
            <Phone size={16} style={{ marginRight: 6 }} />
            Call
          </button>
          <button className="btn primary" style={{ flex: 1 }} onClick={handleBook}>
            Book now
          </button>
        </div>

        {/* Info section */}
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>What this tailor can do</h3>
          <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
            Blouses, dresses, alterations, kids wear, falls & pico, embroidery etc.
            You can specify exactly what you want in the next step.
          </p>
          <p className="muted" style={{ fontSize: 12 }}>
            After booking, a TailorGo captain will pick up your cloth from home and
            deliver back after stitching.
          </p>
        </div>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}
