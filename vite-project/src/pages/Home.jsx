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

  const chips = ["All", "Blouse Stitching", "Dress Stitching", "Alterations", "Kids Wear"];

  useEffect(() => {
    loadTailors();
  }, []);

  const loadTailors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tailors");
      setTailors(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load tailors");
    } finally {
      setLoading(false);
    }
  };

  const filteredTailors = tailors.filter((t) => {
    const text = `${t.name || ""} ${t.bio || ""} ${t.location || ""}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    if (activeChip === "All") return matchesSearch;
    return matchesSearch && (t.bio || "").toLowerCase().includes(activeChip.toLowerCase());
  });

  return (
    <div className="page dark-page">
      <div className="container">
        {/* Top location + heading */}
        <header style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#a3a3a3", fontSize: 13 }}>
            <MapPin size={16} />
            <span>Detecting your area</span>
          </div>
          <h1 style={{ marginTop: 6, fontSize: 22, fontWeight: 600 }}>
            Find nearby <span style={{ color: "#38bdf8" }}>Tailors</span> for your clothes
          </h1>
        </header>

        {/* Big search bar */}
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
            placeholder="Search: blouse stitching, dress, alterations..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: 14,
            }}
          />
        </div>

        {/* Quick filter chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 12 }}>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              style={{
                flexShrink: 0,
                borderRadius: 999,
                border: "1px solid " + (activeChip === chip ? "#38bdf8" : "#27272a"),
                background: activeChip === chip ? "#0f172a" : "#020617",
                color: activeChip === chip ? "#e0f2fe" : "#e5e5e5",
                padding: "6px 12px",
                fontSize: 12,
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Tailor list */}
        {loading ? (
          <p className="muted">Loading nearby tailors...</p>
        ) : filteredTailors.length === 0 ? (
          <p className="muted">No tailors found for this search.</p>
        ) : (
          <div className="card-list">
            {filteredTailors.map((t) => (
              <Link
                key={t.id}
                to={`/tailor/${t.id}`}
                className="card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: 4 }}>{t.name}</h3>
                    <p className="muted" style={{ fontSize: 13 }}>
                      {(t.bio || "").slice(0, 70)}{(t.bio || "").length > 70 ? "..." : ""}
                    </p>
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 12,
                        color: "#a3a3a3",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Star size={14} color="#facc15" />
                        {t.rating || "New"}
                      </span>
                      <span>|</span>
                      <span>{t.location || "Nearby"}</span>
                    </div>
                  </div>
                  {/* Placeholder avatar */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "#020617",
                      border: "1px solid #1f2937",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    🧵
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  <span className="muted">Tap to see details & book</span>
                  <span
                    style={{
                      paddingInline: 10,
                      paddingBlock: 4,
                      borderRadius: 999,
                      background: "#0f172a",
                      border: "1px solid #1d4ed8",
                      fontSize: 12,
                      color: "#bfdbfe",
                    }}
                  >
                    View & Order
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div style={{ height: 70 }} />
    </div>
  );
}
