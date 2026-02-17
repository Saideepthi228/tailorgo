import React from "react";

export default function Settings() {
  return (
    <div className="page dark-page">
      <div className="container">
        <h2 className="page-title">Settings</h2>

        <div className="bg-[#111] p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400">Notification Settings</p>
          <p className="text-gray-400 mt-2">Privacy Options</p>
          <p className="text-gray-400 mt-2">Language</p>
        </div>
      </div>
    </div>
  );
}
