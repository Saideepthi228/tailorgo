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

  const sampleImages = [
    "/images/tailor1.jpg",
    "/images/tailor2.jpg",
    "/images/tailor3.jpg",
    "/images/tailor4.jpg",
  ];

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
      <div className="page">
        <div className="container">Loading tailor...</div>
      </div>
    );
  }

  if (!tailor) {
    return (
      <div className="page">
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

  const image = tailor.img_url || sampleImages[tailor.id % sampleImages.length];

  return (
    <div className="page">
      <div className="container">

        {/* IMAGE */}
        <div
          style={{
            width: "100%",
            height: 220,
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <img
            src={image}
            alt="tailor"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* HEADER CARD */}
        <div className="card">
          <h2 style={{ marginBottom: 6 }}>{tailor.name}</h2>

          <p className="muted" style={{ marginBottom: 10 }}>
            {tailor.bio || "Experienced tailor for all stitching needs."}
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 14,
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={16} color="#facc15" />
              {tailor.rating || "4.5"}
            </span>

            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={16} />
              {tailor.location || "Nearby"}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 14,
            marginBottom: 16,
          }}
        >
          <button
            className="btn outline"
            style={{ flex: 1 }}
            onClick={handleChat}
          >
            <MessageCircle size={16} style={{ marginRight: 6 }} />
            Chat
          </button>

          <button className="btn outline" style={{ flex: 1 }}>
            <Phone size={16} style={{ marginRight: 6 }} />
            Call
          </button>

          <button
            className="btn primary"
            style={{ flex: 1 }}
            onClick={handleBook}
          >
            Book Now
          </button>
        </div>

        {/* SERVICES */}
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>Services Offered</h3>

          <p className="muted" style={{ fontSize: 14 }}>
            Blouses, dresses, alterations, kids wear, falls & pico, embroidery,
            custom stitching and more. You can specify your exact stitching
            requirements in the next step.
          </p>
        </div>

        <div style={{ height: 80 }} />

      </div>
    </div>
  );
}