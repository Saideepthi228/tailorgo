import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");

  async function handleSubmit(e){
    e.preventDefault();

    try{

      const res = await API.post("/auth/login",{
        email,
        password:pass
      });

      const user = res.data.user;
      const token = res.data.token;

      localStorage.setItem("token",token);
      localStorage.setItem("user",JSON.stringify(user));

      if(user.role === "customer"){
        navigate("/");
      }

      else if(user.role === "tailor"){
        navigate("/dashboard");
      }

      else if(user.role === "delivery"){
        navigate("/delivery-dashboard");
      }

    }catch(err){
      console.error(err);
      alert("Invalid login");
    }
  }

  return (
    <div className="p-4 flex flex-col justify-center h-[80vh]">

      <h1 className="text-2xl font-bold text-center mb-4">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-lg"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e)=>setPass(e.target.value)}
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Login
        </button>

      </form>

      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 underline">
          Signup
        </Link>
      </p>

    </div>
  );
}