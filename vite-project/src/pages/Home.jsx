// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Search, MapPin, Star } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChip, setActiveChip] = useState("All");

  const chips = [
    "All",
    "Blouse Stitching",
    "Dress Stitching",
    "Alterations",
    "Kids Wear",
  ];

  useEffect(() => {
    loadTailors();
  }, []);

  const loadTailors = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tailors");

      console.log("✅ API Response:", res.data);

      setTailors(res.data || []);

    } catch (err) {

      console.error("❌ API Error:", err);

      alert("Failed to load tailors");

    } finally {

      setLoading(false);

    }
  };

  const filteredTailors = tailors.filter((t) => {
    const text = `${t.name || ""} ${t.bio || ""} ${t.location || ""}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    if (activeChip === "All") return matchesSearch;

    return (
      matchesSearch &&
      (t.bio || "").toLowerCase().includes(activeChip.toLowerCase())
    );
  });

  console.log("📌 Tailors State:", tailors);
  console.log("📌 Filtered Tailors:", filteredTailors);

  return (
    <div className="page dark-page">
      <div className="container">

        <header style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#a3a3a3",
              fontSize: 13,
            }}
          >
            <MapPin size={16} />
            <span>Detecting your area</span>
          </div>

          <h1
            style={{
              marginTop: 6,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Find nearby <span style={{ color: "#38bdf8" }}>Tailors</span> for
            your clothes
          </h1>
        </header>

        <div
          style={{
            marginBottom: 14,
            background: "#060606",
            borderRadius: 999,
            border: "1px solid #27272a",
            display: "flex",
            alignItems: "center",
            paddingInline: 14,
            paddingBlock: 6,
            gap: 8,
          }}
        >
          <Search size={18} style={{ color: "#a3a3a3" }} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tailor..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            marginBottom: 18,
          }}
        >
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              style={{
                borderRadius: 999,
                padding: "6px 12px",
                border:
                  activeChip === chip
                    ? "1px solid #38bdf8"
                    : "1px solid #27272a",
                background:
                  activeChip === chip ? "#0f172a" : "#020617",
                color:
                  activeChip === chip ? "#38bdf8" : "white",
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {loading ? (

          <h3>Loading tailors...</h3>

        ) : filteredTailors.length === 0 ? (

          <div>

            <h3>No tailors found.</h3>

            <p>Total Tailors Loaded: {tailors.length}</p>

            <p>Filtered Tailors: {filteredTailors.length}</p>

          </div>

        ) : (

          <div className="card-list">

            {filteredTailors.map((t) => (

              <Link
                key={t.id}
                to={`/tailor/${t.id}`}
                className="card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginBottom: 16,
                  display: "block",
                }}
              >

                <div
                  style={{
                    border: "1px solid #333",
                    borderRadius: 16,
                    padding: 16,
                    background: "#111",
                  }}
                >

                  <h2>{t.name}</h2>

                  <p>{t.bio}</p>

                  <p>📍 {t.location}</p>

                  <p>
                    ⭐ {t.rating}
                  </p>

                  <p>
                    Service : {t.service_name}
                  </p>

                  <p>
                    Price : ₹{t.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

      <div style={{ height: 80 }} />

    </div>
  );
}