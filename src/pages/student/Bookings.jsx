// src/pages/student/Bookings.jsx
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Bookings() {
  const { bookings } = useAuth();
  const [filter, setFilter] = useState("all");

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status.toLowerCase() === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Confirmed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'Confirmed': return '✅';
      case 'Completed': return '🎉';
      case 'Cancelled': return '❌';
      default: return '📋';
    }
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Bookings</h2>
          <p className="text-gray-400 text-sm mt-1">Track and manage your service bookings</p>
        </div>
        <div className="text-sm text-gray-400">
          {filteredBookings.length} of {bookings.length} bookings
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "All Bookings", count: bookings.length },
          { key: "pending", label: "Pending", count: bookings.filter(b => b.status === 'Pending').length },
          { key: "confirmed", label: "Confirmed", count: bookings.filter(b => b.status === 'Confirmed').length },
          { key: "completed", label: "Completed", count: bookings.filter(b => b.status === 'Completed').length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === key
                ? 'bg-lime-400 text-black shadow-lg'
                : 'bg-[#0f0f0f] border border-gray-700 text-gray-300 hover:border-gray-600'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
          <p className="text-gray-400 mb-6">
            {filter === "all"
              ? "You haven't made any bookings yet. Start exploring our services!"
              : `No ${filter} bookings at the moment.`
            }
          </p>
          <button
            onClick={() => window.location.href = '/student/services'}
            className="px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all duration-300"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{getStatusIcon(booking.status)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-lime-400 transition-colors">
                        {booking.service}
                      </h3>
                      <p className="text-gray-400 text-sm">{booking.vendor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lime-400 font-bold text-lg">{booking.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {booking.status}
                  </div>

                  {booking.status === 'Pending' && (
                    <p className="text-xs text-gray-500 mt-2">Waiting for vendor confirmation</p>
                  )}
                  {booking.status === 'Confirmed' && (
                    <p className="text-xs text-lime-400 mt-2">Service confirmed!</p>
                  )}
                  {booking.status === 'Completed' && (
                    <p className="text-xs text-blue-400 mt-2">Service completed</p>
                  )}
                </div>
              </div>

              {/* Action buttons for pending bookings */}
              {booking.status === 'Pending' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                  <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                    Contact Vendor
                  </button>
                  <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 text-sm rounded-lg transition-colors">
                    Cancel Booking
                  </button>
                </div>
              )}

              {/* Review button for completed bookings */}
              {booking.status === 'Completed' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                  <button className="px-4 py-2 bg-lime-400/20 hover:bg-lime-400/30 text-lime-400 border border-lime-400/30 text-sm rounded-lg transition-colors">
                    Leave Review
                  </button>
                  <button className="px-4 py-2 bg-blue-400/20 hover:bg-blue-400/30 text-blue-400 border border-blue-400/30 text-sm rounded-lg transition-colors">
                    Book Again
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
