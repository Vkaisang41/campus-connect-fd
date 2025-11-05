import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0e0e0e] to-[#1a1a1a] min-h-screen w-full overflow-hidden">
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

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="hover:text-lime-400 transition-colors font-medium">Services</Link>
            <Link to="/about" className="hover:text-lime-400 transition-colors font-medium">About</Link>
            <Link to="/contact" className="hover:text-lime-400 transition-colors font-medium">Contact</Link>
            <Link to="/login" className="hover:text-lime-400 transition-colors font-medium">Login</Link>
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
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
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

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your Campus Services,
              <span className="bg-gradient-to-r from-lime-400 to-blue-400 bg-clip-text text-transparent"> Just a Click Away</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Connect with essential campus services instantly. From laundry to tutoring,
              everything you need in one convenient, modern platform designed for students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] transition-all duration-300 transform hover:scale-105 text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 bg-gradient-to-r from-lime-400 to-lime-500 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
              </Link>

              <Link
                to="/services"
                className="px-8 py-4 rounded-full border-2 border-gray-600 text-white font-semibold text-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300 text-center relative group"
              >
                <span className="relative z-10">Explore Services</span>
                <div className="absolute inset-0 bg-lime-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-lime-400 group-hover:text-lime-300 transition-colors">500+</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Active Services</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-lime-400 transition-all duration-300 mx-auto mt-1"></div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">10K+</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Happy Students</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300 mx-auto mt-1"></div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">4.9★</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Average Rating</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-purple-400 transition-all duration-300 mx-auto mt-1"></div>
              </div>
            </div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
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

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Laundry Services",
                desc: "Professional wash & fold with pickup/delivery",
                icon: "👕",
                price: "From $5/kg",
                rating: "4.8"
              },
              {
                title: "Printing Services",
                desc: "24/7 print and copy services for all your needs",
                icon: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center",
                price: "From $0.20/page",
                rating: "4.6"
              },
              {
                title: "Tutoring Services",
                desc: "Expert academic support across all subjects",
                icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop&crop=center",
                price: "From $25/hour",
                rating: "4.9"
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.desc}</p>
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-xl text-white">CampusConnect</span>
              </div>
              <p className="text-gray-400 text-sm">Connecting students with campus services since 2025.</p>
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

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 CampusConnect. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
