import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark text-white px-10 py-8">
      <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
      <p className="text-sm text-gray-400">
        View and manage your campus service bookings
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate("/student/services")}
          className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm"
        >
          Browse Services
        </button>
        <button className="px-4 py-2 rounded bg-lime-500 hover:bg-lime-400 text-black font-semibold text-sm">
          My Bookings
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-sm"
        >
          Logout
        </button>
      </div>

      {/* Placeholder content */}
      <div className="mt-8 bg-darklight border border-gray-800 rounded p-6">
        <p className="text-gray-400 text-sm">
          Your bookings will appear here once the backend is connected.
        </p>
      </div>
    </div>
  );
}
