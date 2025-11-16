import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import NotificationBell from "../components/NotificationBell";
import DarkModeToggle from "../components/DarkModeToggle";
import ParticleBackground from "../components/ParticleBackground";

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "Qualicha N.", role: "Frontend Developer", text: "CampusConnect saved me hours every week! Laundry pickup and delivery is a game changer." },
    { name: "Vincent K.", role: "Backend Developer", text: "Found amazing tutoring services and never have to worry about printing assignments again." },
    { name: "Rooney K.", role: "UI/UX Designer", text: "The platform is so easy to use. Booked 5 services in under 2 minutes!" },
    { name: "Ochieng O.", role: "Technical Writer", text: "CampusConnect made campus life so much easier. Highly recommend to all students!" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0e0e0e] to-[#1a1a1a] min-h-screen w-full overflow-hidden relative">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Enhanced Navbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center text-white mb-16"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl">CampusConnect</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/services" className="hover:text-lime-400 transition-colors font-medium">Services</Link>
            <Link to="/about" className="hover:text-lime-400 transition-colors font-medium">About</Link>
            <Link to="/contact" className="hover:text-lime-400 transition-colors font-medium">Contact</Link>
            <Link to="/login" className="hover:text-lime-400 transition-colors font-medium">Login</Link>
            <div className="flex items-center space-x-3">
              <NotificationBell />
              <DarkModeToggle />
            </div>
            <Link
              to="/signup"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 text-black font-semibold hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-lime-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-lime-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 10,000+ Students
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Your Campus Services,
              <span className="bg-gradient-to-r from-lime-400 to-blue-400 bg-clip-text text-transparent block sm:inline"> Just a Click Away</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              Connect with essential campus services instantly. From laundry to tutoring,
              everything you need in one convenient, modern platform designed for students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/signup"
                className="px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold text-base lg:text-lg hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] transition-all duration-300 transform hover:scale-105 text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-gradient-to-r from-lime-400 to-lime-500 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/services"
                className="px-6 lg:px-8 py-3 lg:py-4 rounded-full border-2 border-gray-600 text-white font-semibold text-base lg:text-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300 text-center relative group"
              >
                <span className="relative z-10">Explore Services</span>
                <div className="absolute inset-0 bg-lime-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center group cursor-pointer">
                <div className="text-xl lg:text-2xl font-bold text-lime-400 group-hover:text-lime-300 transition-colors">500+</div>
                <div className="text-xs lg:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Active Services</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-lime-400 transition-all duration-300 mx-auto mt-1"></div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-xl lg:text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">10K+</div>
                <div className="text-xs lg:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Happy Students</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300 mx-auto mt-1"></div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-xl lg:text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">4.9★</div>
                <div className="text-xs lg:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Average Rating</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-purple-400 transition-all duration-300 mx-auto mt-1"></div>
              </div>
            </div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] h-[500px] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 left-8 bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">L</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Laundry Service</div>
                    <div className="text-xs text-gray-400">CleanWave Laundry</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lime-400 font-bold">$5/kg</span>
                  <span className="text-yellow-400 text-sm">⭐ 4.8</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 right-8 bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Printing Service</div>
                    <div className="text-xs text-gray-400">SwiftPrint</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lime-400 font-bold">$0.20/page</span>
                  <span className="text-yellow-400 text-sm">⭐ 4.6</span>
                </div>
              </motion.div>

              {/* Central Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 bg-gradient-to-br from-lime-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <div className="text-gray-400 text-sm">Lightning Fast</div>
                  <div className="text-white font-semibold">Service Delivery</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose CampusConnect?</h2>
            <p className="text-gray-400 text-lg">Everything you need for a seamless campus experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Book services in seconds with our intuitive interface and instant confirmations.",
                trend: "⚡ 2x faster than competitors"
              },
              {
                icon: "🔒",
                title: "Secure & Trusted",
                description: "Your data is protected with enterprise-grade security and verified vendors.",
                trend: "🔐 Bank-level encryption"
              },
              {
                icon: "📱",
                title: "Mobile First",
                description: "Access all features on any device with our responsive, mobile-optimized platform.",
                trend: "📱 95% mobile satisfaction"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 mb-3">{feature.description}</p>
                <div className="text-xs text-lime-400 font-medium bg-lime-400/10 px-2 py-1 rounded-full inline-block">
                  {feature.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Students Say</h2>
            <p className="text-gray-400 text-lg">Real experiences from our community</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-8 text-center"
            >
              <div className="text-6xl text-lime-400 mb-4">"</div>
              <p className="text-xl text-gray-300 mb-6 italic">{testimonials[currentTestimonial].text}</p>
              <div>
                <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                <div className="text-lime-400 text-sm">{testimonials[currentTestimonial].role}</div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-lime-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Popular Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Popular Services</h2>
            <p className="text-gray-400 text-lg">Everything you need for campus life</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Laundry Services",
                desc: "Professional wash & fold with pickup/delivery",
                icon: "👕",
                price: "From $5/kg",
                rating: "4.8",
                category: "Cleaning",
                popular: true
              },
              {
                title: "Printing Services",
                desc: "24/7 print and copy services for all your needs",
                icon: "🖨️",
                price: "From $0.20/page",
                rating: "4.6",
                category: "Academic",
                popular: true
              },
              {
                title: "Tutoring Services",
                desc: "Expert academic support across all subjects",
                icon: "📚",
                price: "From $25/hour",
                rating: "4.9",
                category: "Education",
                popular: true
              },
              {
                title: "Food Delivery",
                desc: "Fresh meals delivered to your dorm",
                icon: "🍕",
                price: "From $8/meal",
                rating: "4.7",
                category: "Food",
                popular: false
              },
              {
                title: "Car Wash",
                desc: "Professional car cleaning services",
                icon: "🚗",
                price: "From $15/car",
                rating: "4.5",
                category: "Automotive",
                popular: false
              },
              {
                title: "Tech Support",
                desc: "Computer repair and IT assistance",
                icon: "💻",
                price: "From $20/hour",
                rating: "4.8",
                category: "Technology",
                popular: false
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all duration-300 cursor-pointer group relative ${
                  service.popular ? 'ring-2 ring-lime-400/30' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-4 bg-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    🔥 Popular
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    service.category === 'Cleaning' ? 'bg-blue-500/20 text-blue-400' :
                    service.category === 'Academic' ? 'bg-purple-500/20 text-purple-400' :
                    service.category === 'Education' ? 'bg-green-500/20 text-green-400' :
                    service.category === 'Food' ? 'bg-orange-500/20 text-orange-400' :
                    service.category === 'Automotive' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {service.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lime-400 font-semibold">{service.price}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-300">{service.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="bg-gradient-to-r from-lime-400/10 to-blue-400/10 border border-lime-400/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 text-lg mb-8">Join thousands of students already using CampusConnect</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">🚀 Create Free Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 rounded-full border-2 border-gray-600 text-white font-semibold text-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300 relative group"
              >
                <span className="relative z-10">Browse Services</span>
                <div className="absolute inset-0 bg-lime-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-800 pt-12 pb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-xl text-white">CampusConnect</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Connecting students with campus services since 2025.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <div className="space-y-2">
                <Link to="/services" className="block text-gray-400 hover:text-lime-400 transition-colors">Services</Link>
                <Link to="/vendors" className="block text-gray-400 hover:text-lime-400 transition-colors">Vendors</Link>
                <Link to="/pricing" className="block text-gray-400 hover:text-lime-400 transition-colors">Pricing</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/help" className="block text-gray-400 hover:text-lime-400 transition-colors">Help Center</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-lime-400 transition-colors">Contact Us</Link>
                <Link to="/faq" className="block text-gray-400 hover:text-lime-400 transition-colors">FAQ</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-lime-400 transition-colors">About</Link>
                <Link to="/careers" className="block text-gray-400 hover:text-lime-400 transition-colors">Careers</Link>
                <Link to="/blog" className="block text-gray-400 hover:text-lime-400 transition-colors">Blog</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 CampusConnect. All rights reserved.</p>
            <div className="flex flex-wrap gap-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
