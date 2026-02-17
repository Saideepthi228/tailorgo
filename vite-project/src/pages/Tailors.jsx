// src/pages/Tailors.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Search, Star } from "lucide-react";

export default function Tailors() {
  const [tailors, setTailors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadTailors = async () => {
    try {
      const res = await API.get("/tailors");
      setTailors(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTailors();
  }, []);

  return (
    <div className="page">
      {/* SEARCH BOX */}
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          className="search-input"
          placeholder="Search tailors, stitching, alterations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-3 overflow-x-auto pb-2 filter-row">
        {["All", "Blouse Stitching", "Dress Stitching", "Alterations", "Kids Wear"].map((cat) => (
          <button key={cat} className="px-4 py-2 rounded-full bg-[#080f1a] border border-[#1f2a3d]">
            {cat}
          </button>
        ))}
      </div>

      <div style={{ height: 16 }} />

      {/* TAILOR LIST */}
      {tailors.map((t) => (
        <div
          key={t.id}
          className="tailor-card"
          onClick={() => navigate(`/tailor/${t.id}`)}
        >
          {/* IMAGE — ONLY SHOW IF EXISTS */}
          <div className="tailor-img-box">
            {t.img_url ? (
              <img src={t.img_url} className="tailor-img" alt="tailor" />
            ) : (
              <div className="img-placeholder">👕</div>
            )}
          </div>

          <div className="tailor-card-body">
            <h2 className="text-xl font-bold">{t.name}</h2>
            <p className="text-sm opacity-70">{t.bio}</p>

            <div className="tailor-info-row">
              <Star size={16} color="#ffcc00" />
              <span>{t.rating || "4.5"}</span>
              <span className="dot">•</span>
              <span>{t.location}</span>
            </div>

            <button className="btn primary small mt-2">
              View & Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
