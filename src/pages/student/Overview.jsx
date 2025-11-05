// src/pages/student/Overview.jsx
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Overview() {
  const { user, bookings, notifications, getUnreadNotifications } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  const recentBookings = bookings.slice(-3).reverse();
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="text-white">
      {/* Header with greeting and notifications */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-400">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button className="relative p-3 bg-[#0f0f0f] border border-gray-700 rounded-xl hover:border-lime-400/50 transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v5H9v-5H3v5h6v5l6-5V7h6z" />
            </svg>
            {getUnreadNotifications().length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {getUnreadNotifications().length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-lime-400">{bookings.length}</div>
            <div className="text-lime-400/60">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-400 font-medium">Total Bookings</div>
          <div className="text-xs text-gray-500 mt-1">All time</div>
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-yellow-400">{pendingBookings}</div>
            <div className="text-yellow-400/60">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-400 font-medium">Pending</div>
          <div className="text-xs text-gray-500 mt-1">Awaiting confirmation</div>
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-green-400">{bookings.filter(b => b.status === 'Confirmed').length}</div>
            <div className="text-green-400/60">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-400 font-medium">Confirmed</div>
          <div className="text-xs text-gray-500 mt-1">Ready to go</div>
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-blue-400">{completedBookings}</div>
            <div className="text-blue-400/60">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-400 font-medium">Completed</div>
          <div className="text-xs text-gray-500 mt-1">Successfully done</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Link to="/student/bookings" className="text-lime-400 text-sm hover:text-lime-400/80 font-medium transition-colors">
            View all →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-gray-400 mb-4">No recent bookings</p>
            <Link
              to="/student/services"
              className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 border border-lime-400/20 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-700/50 rounded-lg hover:border-gray-600 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    booking.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                    booking.status === 'Confirmed' ? 'bg-green-400/20 text-green-400' :
                    'bg-gray-400/20 text-gray-400'
                  }`}>
                    {booking.status === 'Pending' ? '⏳ Pending' :
                     booking.status === 'Confirmed' ? '✅ Confirmed' : '📋 Completed'}
                  </div>
                  <div>
                    <div className="font-medium text-white">{booking.service}</div>
                    <div className="text-sm text-gray-400">{booking.vendor}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    booking.status === 'Pending' ? 'text-yellow-400 bg-yellow-400/10' :
                    booking.status === 'Confirmed' ? 'text-green-400 bg-green-400/10' :
                    'text-gray-400 bg-gray-400/10'
                  }`}>
                    {booking.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/student/services"
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-lime-400/10 to-lime-500/10 border border-lime-400/20 rounded-lg hover:border-lime-400/40 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-lime-400/20 rounded-lg flex items-center justify-center group-hover:bg-lime-400/30 transition-colors">
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-lime-400 transition-colors">Browse Services</div>
              <div className="text-sm text-gray-400">Find what you need</div>
            </div>
          </Link>

          <Link
            to="/student/profile"
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-gray-400/10 to-gray-500/10 border border-gray-400/20 rounded-lg hover:border-gray-400/40 hover:shadow-lg hover:shadow-gray-400/10 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gray-400/20 rounded-lg flex items-center justify-center group-hover:bg-gray-400/30 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-gray-300 transition-colors">Update Profile</div>
              <div className="text-sm text-gray-400">Manage your account</div>
            </div>
          </Link>

          <Link
            to="/student/bookings"
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-blue-400/10 to-blue-500/10 border border-blue-400/20 rounded-lg hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-400/10 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">My Bookings</div>
              <div className="text-sm text-gray-400">Track your services</div>
            </div>
          </Link>

          <button
            onClick={() => alert('💬 Live chat coming soon! Contact us at support@campusconnect.edu')}
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-purple-400/10 to-purple-500/10 border border-purple-400/20 rounded-lg hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center group-hover:bg-purple-400/30 transition-colors">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-purple-400 transition-colors">Live Support</div>
              <div className="text-sm text-gray-400">Get help instantly</div>
            </div>
          </button>
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
