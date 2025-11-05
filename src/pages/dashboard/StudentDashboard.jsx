import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Logout */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Welcome,</div>
                <div className="text-white font-medium">{user?.name || user?.email || 'Student'}</div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                    navigate('/');
                  }
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
          <h1 className="heading-lg text-gradient">Student Dashboard</h1>
          <p className="body-md text-gray-400 mt-3 max-w-2xl">
            Your gateway to campus services. Discover, book, and manage all your academic and lifestyle needs in one convenient platform.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate("/student/services")}
            className="p-4 bg-gradient-to-r from-lime-400/10 to-lime-500/10 border border-lime-400/20 rounded-xl hover:border-lime-400/40 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-400/20 rounded-lg flex items-center justify-center group-hover:bg-lime-400/30 transition-colors">
                <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white group-hover:text-lime-400 transition-colors">Browse Services</div>
                <div className="text-sm text-gray-400">Find what you need</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/student/bookings")}
            className="p-4 bg-gradient-to-r from-blue-400/10 to-blue-500/10 border border-blue-400/20 rounded-xl hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-400/10 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">My Bookings</div>
                <div className="text-sm text-gray-400">Track your services</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/student/profile")}
            className="p-4 bg-gradient-to-r from-purple-400/10 to-purple-500/10 border border-purple-400/20 rounded-xl hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center group-hover:bg-purple-400/30 transition-colors">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white group-hover:text-purple-400 transition-colors">My Profile</div>
                <div className="text-sm text-gray-400">Manage your account</div>
              </div>
            </div>
          </button>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your Dashboard!</h2>
          <p className="text-gray-400 mb-6">Ready to discover amazing campus services? Start by browsing our extensive collection of services or check your existing bookings.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/student/services")}
              className="px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all duration-300"
            >
              Start Browsing Services
            </button>
            <button
              onClick={() => navigate("/student/bookings")}
              className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
            >
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
