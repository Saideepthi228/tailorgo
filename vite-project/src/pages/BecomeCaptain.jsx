// src/pages/BecomeCaptain.jsx
import React from "react";

export default function BecomeCaptain() {
  const handleDownload = () => {
    alert("TailorGo Captain app download will be available in the next phase.");
  };

  return (
    <div className="page dark-page">
      <div className="container">
        <h1 className="page-title">Become a TailorGo Captain</h1>

        <div className="card">
          <p className="muted" style={{ marginBottom: 10 }}>
            Earn money by picking up and delivering clothes, or by stitching as a partner tailor.
          </p>
          <ul className="muted small" style={{ paddingLeft: 16, marginBottom: 12 }}>
            <li>Flexible timings</li>
            <li>Weekly payouts</li>
            <li>Work as delivery captain or tailor</li>
          </ul>
          <button className="btn primary full" onClick={handleDownload}>
            Download TailorGo Captain (coming soon)
          </button>
        </div>
      </div>
      <div style={{ height: 80 }} />
    </div>
  );
}
