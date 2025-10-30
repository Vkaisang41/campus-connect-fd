// src/pages/student/Overview.jsx
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Overview() {
  const { user, bookings } = useAuth();

  const recentBookings = bookings.slice(-3).reverse();
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name || 'Student'} 👋</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-lime-400">{bookings.length}</div>
          <div className="text-sm text-gray-400">Total Bookings</div>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-400">{pendingBookings}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">{bookings.filter(b => b.status === 'Confirmed').length}</div>
          <div className="text-sm text-gray-400">Confirmed</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link to="/student/bookings" className="text-lime-400 text-sm hover:text-lime-300">
            View all →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-gray-400 text-sm">No bookings yet. <Link to="/student/services" className="text-lime-400 hover:text-lime-300">Browse services</Link> to get started.</p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-b-0">
                <div>
                  <div className="font-medium text-sm">{booking.service}</div>
                  <div className="text-xs text-gray-400">{booking.vendor}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${
                    booking.status === 'Pending' ? 'text-yellow-400' :
                    booking.status === 'Confirmed' ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {booking.status}
                  </div>
                  <div className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/student/services"
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            Browse Services
          </Link>
          <Link
            to="/student/profile"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
          >
            Update Profile
          </Link>
        </div>
      </div>

      {/* Featured Services */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Popular Services</h2>
          <Link to="/student/services" className="text-lime-400 text-sm hover:text-lime-300">
            Browse all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#111] border border-gray-700 rounded-lg p-4 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-black font-bold text-sm">L</div>
              <div>
                <div className="font-medium text-sm">Laundry Service</div>
                <div className="text-xs text-gray-400">CleanWave Laundry</div>
              </div>
            </div>
            <p className="text-xs text-gray-300 mb-2">Professional laundry with quick turnaround</p>
            <div className="flex justify-between items-center">
              <span className="text-lime-400 text-sm font-medium">$5/kg</span>
              <span className="text-yellow-400 text-xs">★ 4.5</span>
            </div>
          </div>
          <div className="bg-[#111] border border-gray-700 rounded-lg p-4 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">P</div>
              <div>
                <div className="font-medium text-sm">Printing Service</div>
                <div className="text-xs text-gray-400">SwiftPrint</div>
              </div>
            </div>
            <p className="text-xs text-gray-300 mb-2">High-quality printing for all your needs</p>
            <div className="flex justify-between items-center">
              <span className="text-lime-400 text-sm font-medium">$0.20/page</span>
              <span className="text-yellow-400 text-xs">★ 4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
