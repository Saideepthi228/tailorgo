import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      nav("/login");
    } catch (err) {
      alert("Signup failed");
    }
  }

  return (
    <div className="p-4 flex flex-col justify-center h-[80vh]">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Create Account
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
