import React from "react";
import AppRouter from "./AppRouter";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      {/* Page content */}
      <main className="flex-1 pb-20">
        <AppRouter />
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
