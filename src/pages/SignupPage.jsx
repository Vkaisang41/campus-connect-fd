import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { fullName, email, role };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    if (role === "student") navigate("/student/dashboard");
    if (role === "vendor") navigate("/vendor/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white px-16 pt-10">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors text-sm mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-1">CampusConnect</h1>

      <div className="flex justify-start gap-24 mt-10">
        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="w-[380px]">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm mb-6">
            Join thousands of students and vendors on campus
          </p>

          <label className="text-sm text-gray-300">Full Name</label>
          <input
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 mb-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="text-sm text-gray-300">Email Address</label>
          <input
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="text-sm text-gray-300">I am a...</label>
          <select
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 mb-6"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="vendor">Vendor</option>
          </select>

          <button className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 rounded">
            Create Account
          </button>

          <p className="text-gray-400 text-sm mt-3">
            Already have an account?
            <Link className="text-lime-400 ml-1" to="/login">
              Login
            </Link>
          </p>
        </form>

        {/* ACCOUNT TYPE SECTION */}
        <div>
          <h3 className="text-lg font-bold mb-1">Get Started Today</h3>
          <p className="text-gray-400 text-sm mb-4">Choose your account type:</p>

          <div
            onClick={() => setRole("student")}
            className={`cursor-pointer border rounded-md p-3 w-[260px] mb-3 transition 
              ${role === "student" ? "border-lime-400 bg-[#0f0f0f]" : "border-gray-700"}`}
          >
            <p className="text-lime-300 font-semibold text-sm">✦ Student Account</p>
            <p className="text-gray-400 text-xs mt-1">
              Browse services, make bookings, and leave reviews
            </p>
          </div>

          <div
            onClick={() => setRole("vendor")}
            className={`cursor-pointer border rounded-md p-3 w-[260px] transition
              ${role === "vendor" ? "border-lime-400 bg-[#0f0f0f]" : "border-gray-700"}`}
          >
            <p className="text-blue-400 font-semibold text-sm">👤 Vendor Account</p>
            <p className="text-gray-400 text-xs mt-1">
              List your services and manage bookings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
