import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              CampusConnect
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/services"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 font-medium"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 font-medium"
            >
              Contact
            </Link>

            {!user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium">{user.name || user.email}</span>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to logout?')) {
                      logout();
                      window.location.href = '/';
                    }
                  }}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/services"
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {!user ? (
                <div className="pt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg text-center transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <div className="px-3 py-2 text-gray-300 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium">{user.name || user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout?')) {
                        logout();
                        setIsMenuOpen(false);
                        window.location.href = '/';
                      }
                    }}
                    className="block w-full text-left px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
