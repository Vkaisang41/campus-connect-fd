import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoAccounts = {
    "student@campus.edu": { role: "student" },
    "vendor@campus.edu": { role: "vendor" },
    "admin@campus.edu": { role: "admin" },
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    const found = demoAccounts[email.toLowerCase()] || { role: "student" };

    const loggedUser = {
      email,
      role: found.role,
    };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    if (found.role === "student") navigate("/student/dashboard");
    if (found.role === "vendor") navigate("/vendor/dashboard");
    if (found.role === "admin") navigate("/admin/dashboard");
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
        
        {/* -------- LEFT SIDE INTRO -------- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[420px]"
        >
          <h2 className="text-4xl font-bold leading-tight">
            Welcome Back to
            <span className="text-lime-400 block">CampusConnect</span>
          </h2>

          <p className="text-gray-400 text-sm mt-3 mb-6">
            Login to access all your campus services and manage your bookings in one convenient place.
          </p>

          {/* Quick demo card */}
          <div className="bg-[#111] border border-gray-800 rounded-lg p-4 text-sm text-gray-300 w-[320px]">
            <p className="text-gray-400 mb-2 font-semibold">Quick login demo accounts:</p>
            <div className="space-y-1">
              <p><span className="text-lime-400 font-medium">Student:</span> student@campus.edu</p>
              <p><span className="text-blue-400 font-medium">Vendor:</span> vendor@campus.edu</p>
              <p><span className="text-yellow-400 font-medium">Admin:</span> admin@campus.edu</p>
            </div>
            <p className="text-xs text-gray-500 mt-2 border-t border-gray-700 pt-2">Password: any value</p>
            <p className="text-xs text-lime-400 mt-1">💡 Try admin@campus.edu to see reports</p>
          </div>
        </motion.div>

        {/* -------- RIGHT FORM -------- */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="w-[360px]"
        >
          <h3 className="text-lg font-bold mb-2">Login</h3>
          <p className="text-gray-400 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <label className="text-sm text-gray-300">Email Address</label>
          <input
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 mb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-xs text-gray-500 mb-4 cursor-pointer hover:text-gray-300">
            Forgot password?
          </p>

          <button className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 rounded transition-all">
            Login
          </button>

          <p className="text-gray-400 text-sm mt-3 text-center">
            Don't have an account?
            <Link to="/signup" className="text-lime-400 ml-1">
              Sign up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
