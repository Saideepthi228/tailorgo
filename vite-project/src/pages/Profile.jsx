// src/pages/Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Gift, Headset, ChevronRight, Star } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "Guest Customer",
    phone: "Not added",
  };

  const go = (path) => () => navigate(path);

  return (
    <div className="page dark-page">
      <div className="container">
        {/* Top user card */}
        <div className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "#020617",
              border: "1px solid #1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 4 }}>{user.name}</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "#a3a3a3",
              }}
            >
              <Phone size={14} /> <span>{user.phone}</span>
            </div>
          </div>
          <button
            className="btn outline small"
            onClick={() => alert("Profile editing can be added later.")}
          >
            Edit
          </button>
        </div>

        {/* Quick Stats */}
        <div
          className="card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <div>
            <div className="muted small">Total trips</div>
            <div>0</div>
          </div>
          <div>
            <div className="muted small">Rewards</div>
            <div>0 points</div>
          </div>
          <div>
            <div className="muted small">Rating</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={14} color="#facc15" /> New
            </div>
          </div>
        </div>

        {/* Settings list */}
        <div className="card">
          <ProfileRow title="Your trips / orders" onClick={go("/orders")} />
          <ProfileRow title="Rewards & offers" icon={<Gift size={18} />} onClick={go("/rewards")} />
          <ProfileRow title="Help & support" icon={<Headset size={18} />} onClick={go("/support")} />
          <ProfileRow
            title="Become a TailorGo Captain"
            subtitle="Earn by delivering & stitching"
            onClick={go("/become-captain")}
          />
          <ProfileRow title="Logout" danger onClick={go("/logout")} />
        </div>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

function ProfileRow({ title, subtitle, icon, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        outline: "none",
        background: "transparent",
        padding: "10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
        {icon && (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background: "#020617",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: 14,
              color: danger ? "#fecaca" : "#f9fafb",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div className="muted small" style={{ marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <ChevronRight size={18} color="#4b5563" />
    </button>
  );
}
