// src/pages/student/Services.jsx
import { useEffect, useState } from "react";
import { fetchServices } from "../../services/serviceApi";
import { useAuth } from "../../context/AuthContext";
import VendorStudentChat from "../../components/chat/VendorStudentChat";
import VideoPlayer from "../../components/VideoPlayer";

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [showChat, setShowChat] = useState(false);
  const [chatVendor, setChatVendor] = useState(null);
  const { addBooking, addReport, user } = useAuth();

  useEffect(() => {
    fetchServices().then(allServices => {
      // Filter services by approved status and institution
      const approvedServices = allServices.filter(service => service.approved === true);
      setServices(approvedServices);
    });
  }, []);

  useEffect(() => {
    let filtered = services;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(service => {
        // Map categories to service types
        const categoryMap = {
          "Laundry": ["Laundry", "Wash", "Clean"],
          "Printing": ["Printing", "Print", "Copy"],
          "Tutoring": ["Tutoring", "Academic", "Study"],
          "Food & Beverage": ["Food", "Catering", "Restaurant", "Cafe"],
          "Transportation": ["Transport", "Ride", "Delivery"],
          "Technology": ["Tech", "Computer", "IT", "Repair"],
          "Academic Services": ["Academic", "Library", "Study"],
          "Creative Services": ["Design", "Creative", "Art"],
          "Automotive": ["Car", "Auto", "Vehicle"]
        };
        return categoryMap[selectedCategory]?.some(keyword =>
          service.name.toLowerCase().includes(keyword.toLowerCase()) ||
          service.description.toLowerCase().includes(keyword.toLowerCase())
        );
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
        case "price-high":
          return parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, sortBy]);

  const handleBookService = (service) => {
    // Show payment methods modal before booking
    const paymentMethodsText = service.paymentMethods?.map(method => {
      if (method.type === 'mpesa') {
        return `M-Pesa: ${method.instructions}`;
      } else if (method.type === 'bank') {
        return `Bank Transfer: ${method.instructions}`;
      } else if (method.type === 'cash') {
        return `Cash: ${method.instructions}`;
      }
      return method.instructions;
    }).join('\n\n') || 'Contact vendor for payment details';

    const confirmBooking = window.confirm(
      `Book ${service.name} for ${service.price}?\n\nPayment Methods:\n${paymentMethodsText}\n\nVendor Contact: ${service.vendorContact || 'Contact vendor directly'}\n\nNote: Payment is made directly to the vendor using their preferred method. The app does not handle payments.`
    );

    if (confirmBooking) {
      addBooking({
        service: service.name,
        vendor: service.vendorName,
        price: service.price,
        institution: service.institution,
        paymentMethods: service.paymentMethods,
        vendorContact: service.vendorContact,
        status: 'pending_payment'
      });
      alert(`Booking request sent for ${service.name}!\n\nPlease make payment using the vendor's preferred method and confirm with the vendor.`);
    }
  };

  const handleReportVendor = (vendorName) => {
    setSelectedVendor(vendorName);
    setShowReportModal(true);
  };

  const handleChatWithVendor = (service) => {
    setChatVendor({
      id: service.vendorId || service.id,
      name: service.vendorName,
      role: 'vendor',
      status: 'online',
      rating: service.rating
    });
    setShowChat(true);
  };

  const submitReport = () => {
    if (!reportReason.trim()) {
      alert("Please provide a reason for the report.");
      return;
    }

    addReport({
      type: "student_to_vendor",
      reporter: user?.email || "Anonymous Student",
      reportedEntity: selectedVendor,
      reason: reportReason,
      description: `Student reported vendor ${selectedVendor} for: ${reportReason}`,
    });

    setShowReportModal(false);
    setReportReason("");
    setSelectedVendor(null);
    alert("Report submitted successfully. Admin will review it.");
  };

  return (
    <div className="text-white min-h-screen pt-20">
      <div className="mb-12 text-center">
        <div className="inline-block p-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl mb-6">
          <div className="bg-slate-900 rounded-xl px-6 py-2">
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-bold text-sm uppercase tracking-wider">
              Premium Services
            </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-premium animate-float">
          Available Services
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover and book premium campus services with cutting-edge technology and seamless experiences
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Updates</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-pink-400">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
            <span className="text-sm font-medium">Instant Booking</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-premium rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden animate-slide-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
        <div className="relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search Services</label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by name, vendor, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:border-slate-500/70"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl px-4 py-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:border-slate-500/70 appearance-none"
            >
              <option value="All">All Categories</option>
              <option value="Laundry">Laundry</option>
              <option value="Printing">Printing</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Transportation">Transportation</option>
              <option value="Technology">Technology</option>
              <option value="Academic Services">Academic Services</option>
              <option value="Creative Services">Creative Services</option>
              <option value="Automotive">Automotive</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl px-4 py-4 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:border-slate-500/70 appearance-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-sm text-gray-400 bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/30">
          <div className="flex items-center justify-between">
            <span>Showing <span className="text-cyan-400 font-semibold">{filteredServices.length}</span> of <span className="text-purple-400 font-semibold">{services.length}</span> services</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Updates</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {filteredServices.map((s, index) => (
          <div
            key={s.id}
            className="group relative glass-premium interactive-card hover-lift will-change-transform gpu-accelerated p-6 rounded-2xl flex flex-col md:flex-row gap-6 overflow-hidden animate-fade-in-scale"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Premium animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>
            {/* Service Image/Video - Left Side */}
            <div className="md:w-1/3">
              {s.video ? (
                <VideoPlayer
                  videoUrl={s.video}
                  title={`${s.name} - ${s.vendorName}`}
                  thumbnail={s.image}
                  className="w-full h-48 md:h-full"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {s.name.toLowerCase().includes('laundry') && '👕'}
                          {s.name.toLowerCase().includes('print') && '🖨️'}
                          {s.name.toLowerCase().includes('tutor') && '📚'}
                          {s.name.toLowerCase().includes('food') && '🍽️'}
                          {s.name.toLowerCase().includes('transport') && '🚗'}
                          {s.name.toLowerCase().includes('tech') && '💻'}
                          {!s.name.toLowerCase().includes('laundry') &&
                           !s.name.toLowerCase().includes('print') &&
                           !s.name.toLowerCase().includes('tutor') &&
                           !s.name.toLowerCase().includes('food') &&
                           !s.name.toLowerCase().includes('transport') &&
                           !s.name.toLowerCase().includes('tech') && '🛍️'}
                        </div>
                        <p className="text-gray-400 text-sm">Service Image</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Service Details - Right Side */}
            <div className="md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-xl text-white group-hover:text-lime-400 transition-colors">{s.name}</h3>
                      {s.video && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          🎥 Video
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{s.vendorName}</p>
                    <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded-full w-fit">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm text-gray-300 font-medium">{s.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({s.reviews})</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{s.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-lime-400">{s.price}</span>
                      <span className="text-xs text-gray-500">per service</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>~30 min</span>
                    </div>
                  </div>

                  {/* Institution and Payment Methods */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{s.institution}</span>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex flex-wrap gap-1">
                      {s.paymentMethods?.map((method, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-[#1a1a1a] border border-gray-700 rounded-full text-xs text-gray-300"
                          title={method.instructions}
                        >
                          {method.type === 'mpesa' && (
                            <>
                              <span className="text-green-400">📱</span>
                              <span>M-Pesa</span>
                            </>
                          )}
                          {method.type === 'bank' && (
                            <>
                              <span className="text-blue-400">🏦</span>
                              <span>Bank</span>
                            </>
                          )}
                          {method.type === 'cash' && (
                            <>
                              <span className="text-yellow-400">💵</span>
                              <span>Cash</span>
                            </>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 relative z-10">
                <button
                  onClick={() => handleChatWithVendor(s)}
                  className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-400 hover:text-cyan-400 border border-blue-500/30 hover:border-cyan-500/50 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-medium backdrop-blur-sm"
                  title="Chat with vendor"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg">💬</span>
                    <span className="hidden sm:inline">Chat</span>
                  </span>
                </button>
                <button
                  onClick={() => handleReportVendor(s.vendorName)}
                  className="flex-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-400 hover:text-pink-400 border border-red-500/30 hover:border-pink-500/50 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 font-medium backdrop-blur-sm"
                  title="Report this vendor"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg">🚨</span>
                    <span className="hidden sm:inline">Report</span>
                  </span>
                </button>
                <button
                  onClick={() => handleBookService(s)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-purple-500/30 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-lg">✨</span>
                    <span className="hidden sm:inline">Book Now</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Modal */}
      {showChat && chatVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl w-full max-w-2xl h-[80vh] max-h-[600px] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Chat with {chatVendor.name}</h3>
              <button
                onClick={() => {
                  setShowChat(false);
                  setChatVendor(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full">
              <VendorStudentChat
                currentUser={{ id: user?.id || 1, name: user?.name || 'Student', role: 'student' }}
                targetUser={chatVendor}
              />
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#151515] border border-gray-800 rounded-xl p-6 w-[400px] max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Report Vendor</h3>
            <p className="text-sm text-gray-400 mb-4">
              Report <span className="text-red-400">{selectedVendor}</span> for inappropriate behavior or service issues.
            </p>

            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white h-24 mb-4"
              placeholder="Describe the issue..."
            />

            <div className="flex gap-3">
              <button
                onClick={submitReport}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded transition-colors"
              >
                Submit Report
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason("");
                  setSelectedVendor(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
