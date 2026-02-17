// src/components/BottomNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  MessageCircle,
  ListOrdered,
  User
} from "lucide-react";

export default function BottomNav() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#050505",
        borderTop: "1px solid #262626",
        padding: "8px 0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <NavIcon to="/" icon={<Home size={22} />} label="Home" />
      <NavIcon to="/chat" icon={<MessageCircle size={22} />} label="Chat" />
      <NavIcon to="/orders" icon={<ListOrdered size={22} />} label="Orders" />
      {/* Cart removed from nav as per new flow */}
      <NavIcon to="/profile" icon={<User size={22} />} label="Profile" />
    </div>
  );
}

function NavIcon({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      style={{
        color: "#b3b3b3",
        textDecoration: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="nav-item"
    >
      <div
        style={{
          padding: "8px",
          borderRadius: "999px",
          transition: "0.2s",
        }}
        className="nav-icon"
      >
        {icon}
      </div>
      {/* Label on hover */}
      <span
        style={{
          position: "absolute",
          bottom: "40px",
          background: "black",
          padding: "3px 8px",
          borderRadius: "6px",
          fontSize: "11px",
          opacity: 0,
          color: "white",
          transition: "opacity 0.2s",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
        className="nav-label"
      >
        {label}
      </span>
    </NavLink>
  );
}
