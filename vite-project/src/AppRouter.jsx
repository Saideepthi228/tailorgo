// src/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Tailors from "./pages/Tailors.jsx";
import TailorDetails from "./pages/TailorDetails.jsx";
import OrderForm from "./pages/OrderForm.jsx";

import Chat from "./pages/Chat.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

import TrackOrder from "./pages/TrackOrder.jsx";
import BookTailor from "./pages/BookTailor.jsx";
import Measurements from "./pages/Measurements.jsx";
import DeliveryHome from "./pages/DeliveryHome.jsx";

import Rewards from "./pages/Rewards.jsx";
import Support from "./pages/Support.jsx";
import BecomeCaptain from "./pages/BecomeCaptain.jsx";
import Logout from "./pages/Logout.jsx";
import TailorDashboard from "./pages/TailorDashboard.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Tailors page becomes HOME */}
      <Route path="/" element={<Tailors />} />

      <Route path="/tailor/:id" element={<TailorDetails />} />
      <Route path="/order/:tailorId" element={<OrderForm />} />

      <Route path="/chat" element={<Chat />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/track/:id" element={<TrackOrder />} />
      <Route path="/book" element={<BookTailor />} />
      <Route path="/measure" element={<Measurements />} />
      <Route path="/delivery" element={<DeliveryHome />} />

      <Route path="/rewards" element={<Rewards />} />
      <Route path="/support" element={<Support />} />
      <Route path="/become-captain" element={<BecomeCaptain />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<TailorDashboard />} />
    </Routes>
  );
}