// src/pages/student/Services.jsx
import { useEffect, useState } from "react";
import { fetchServices } from "../../services/serviceApi";
import { useAuth } from "../../context/AuthContext";
import VendorStudentChat from "../../components/chat/VendorStudentChat";

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
    <div className="text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Available Services</h2>
        <p className="text-gray-400">Discover and book campus services with ease</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search Services</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, vendor, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
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
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-lime-400 focus:outline-none transition-colors"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredServices.length} of {services.length} services
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((s) => (
          <div
            key={s.id}
            className="bg-[#0f0f0f] border border-gray-800 p-6 rounded-xl hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-300 group"
          >
            {/* Service Image */}
            <div className="mb-4">
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
            </div>

            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white group-hover:text-lime-400 transition-colors mb-1">{s.name}</h3>
                <p className="text-sm text-gray-400">{s.vendorName}</p>
              </div>
              <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded-full">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm text-gray-300 font-medium">{s.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({s.reviews})</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">{s.description}</p>

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

            <div className="flex gap-2">
              <button
                onClick={() => handleChatWithVendor(s)}
                className="flex-1 text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30 hover:border-blue-500/50 px-3 py-2 rounded-lg transition-colors"
                title="Chat with vendor"
              >
                💬 Chat
              </button>
              <button
                onClick={() => handleReportVendor(s.vendorName)}
                className="flex-1 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 hover:border-red-500/50 px-3 py-2 rounded-lg transition-colors"
                title="Report this vendor"
              >
                Report Issue
              </button>
              <button
                onClick={() => handleBookService(s)}
                className="flex-1 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-400/25"
              >
                Book Now
              </button>
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
