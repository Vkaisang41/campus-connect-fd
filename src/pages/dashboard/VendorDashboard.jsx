import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchServices } from "../../services/serviceApi";
import VendorStudentChat from "../../components/chat/VendorStudentChat";

export default function VendorDashboard() {
  const { user, addReport, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '' });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({ studentEmail: '', reason: '' });
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    // Load services and mock bookings for this vendor
    fetchServices().then(allServices => {
      // Filter services by this vendor (in a real app, this would come from API)
      const vendorServices = allServices.filter(s => s.vendorName === "CleanWave Laundry" || s.vendorName === "SwiftPrint" || s.vendorName === "TutorHub");
      setServices(vendorServices);
    });

    // Mock bookings for vendor's services
    setBookings([
      { id: 1, service: "Laundry Service", customer: "John Doe", status: "Pending", date: "2025-01-15" },
      { id: 2, service: "Printing Service", customer: "Jane Smith", status: "Confirmed", date: "2025-01-16" },
      { id: 3, service: "Tutoring", customer: "Bob Johnson", status: "Completed", date: "2025-01-14" },
    ]);

    // Mock active chats with students
    setActiveChats([
      {
        id: 1,
        student: { id: 1, name: "John Doe", email: "john.doe@uonbi.ac.ke", role: "student", status: "online" },
        service: "Laundry Service",
        lastMessage: "Hi, I need laundry service for this weekend",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 2,
        messages: [
          { id: 1, senderId: 1, senderName: "John Doe", senderRole: "student", text: "Hi, I need laundry service for this weekend", timestamp: new Date(Date.now() - 1000 * 60 * 30), read: true },
          { id: 2, senderId: 'vendor', senderName: user?.name || 'Vendor', senderRole: 'vendor', text: "Hello John! I'd be happy to help. What time works best for pickup?", timestamp: new Date(Date.now() - 1000 * 60 * 25), read: true },
          { id: 3, senderId: 1, senderName: "John Doe", senderRole: "student", text: "Saturday morning around 9 AM would be perfect", timestamp: new Date(Date.now() - 1000 * 60 * 20), read: false },
          { id: 4, senderId: 1, senderName: "John Doe", senderRole: "student", text: "I have about 5kg of clothes", timestamp: new Date(Date.now() - 1000 * 60 * 15), read: false }
        ]
      },
      {
        id: 2,
        student: { id: 2, name: "Jane Smith", email: "jane.smith@uonbi.ac.ke", role: "student", status: "offline" },
        service: "Printing Service",
        lastMessage: "Thanks for the quick service!",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
        unreadCount: 0,
        messages: [
          { id: 1, senderId: 2, senderName: "Jane Smith", senderRole: "student", text: "Hi, I need to print 20 pages of my thesis", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), read: true },
          { id: 2, senderId: 'vendor', senderName: user?.name || 'Vendor', senderRole: 'vendor', text: "Hello Jane! Color or black & white? Single or double sided?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), read: true },
          { id: 3, senderId: 2, senderName: "Jane Smith", senderRole: "student", text: "Black and white, double sided please", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), read: true },
          { id: 4, senderId: 'vendor', senderName: user?.name || 'Vendor', senderRole: 'vendor', text: "Perfect! That will be KES 160. Ready in 30 minutes.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), read: true },
          { id: 5, senderId: 2, senderName: "Jane Smith", senderRole: "student", text: "Thanks for the quick service!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), read: true }
        ]
      }
    ]);
  }, []);

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    ));
  };

  const handleEditService = (service) => {
    setEditingService(service.id);
    setEditForm({
      name: service.name,
      description: service.description,
      price: service.price
    });
  };

  const handleSaveService = () => {
    setServices(services.map(s =>
      s.id === editingService
        ? { ...s, ...editForm }
        : s
    ));
    setEditingService(null);
    setEditForm({ name: '', description: '', price: '' });
    alert('Service updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setEditForm({ name: '', description: '', price: '' });
  };

  const handleReportStudent = () => {
    setShowReportModal(true);
  };

  const submitStudentReport = () => {
    if (!reportForm.studentEmail.trim() || !reportForm.reason.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    addReport({
      type: "vendor_to_student",
      reporter: user?.email || "Vendor",
      reportedEntity: reportForm.studentEmail,
      reason: reportForm.reason,
      description: `Vendor reported student ${reportForm.studentEmail} for: ${reportForm.reason}`,
    });

    setShowReportModal(false);
    setReportForm({ studentEmail: '', reason: '' });
    alert("Report submitted successfully. Admin will review it.");
  };

  const handleOpenChat = (chat) => {
    setSelectedChat(chat);
    setShowChatModal(true);
    // Mark messages as read
    setActiveChats(chats =>
      chats.map(c =>
        c.id === chat.id
          ? { ...c, unreadCount: 0, messages: c.messages.map(m => ({ ...m, read: true })) }
          : c
      )
    );
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
    setSelectedChat(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Logout */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={() => window.history.back()}
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
                <div className="text-white font-medium">{user?.name || user?.email || 'Vendor'}</div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                    window.location.href = '/';
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
          <h1 className="text-2xl font-bold text-gradient">Vendor Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Manage your services, track bookings, and grow your business on the CampusConnect platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="group glass-premium interactive-card hover-lift will-change-transform gpu-accelerated p-6 rounded-2xl animate-fade-in-scale">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-lime-400/10 rounded-xl group-hover:bg-lime-400/20 transition-colors">
                <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-lime-400 mb-1">{services.length}</div>
            <div className="text-sm text-gray-400 font-medium">Active Services</div>
            <div className="text-xs text-gray-500 mt-1">Services you're offering</div>
          </div>

          <div className="group glass-premium interactive-card hover-lift will-change-transform gpu-accelerated p-6 rounded-2xl animate-fade-in-scale animation-delay-1000">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">{bookings.filter(b => b.status === 'Pending').length}</div>
            <div className="text-sm text-gray-400 font-medium">Pending Bookings</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting your response</div>
          </div>

          <div className="group glass-premium interactive-card hover-lift will-change-transform gpu-accelerated p-6 rounded-2xl animate-fade-in-scale animation-delay-2000">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-400/10 rounded-xl group-hover:bg-green-400/20 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{bookings.filter(b => b.status === 'Confirmed').length}</div>
            <div className="text-sm text-gray-400 font-medium">Confirmed</div>
            <div className="text-xs text-gray-500 mt-1">Ready to serve</div>
          </div>

          <div className="group glass-premium interactive-card hover-lift will-change-transform gpu-accelerated p-6 rounded-2xl animate-fade-in-scale animation-delay-3000">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-400/10 rounded-xl group-hover:bg-blue-400/20 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">{bookings.filter(b => b.status === 'Completed').length}</div>
            <div className="text-sm text-gray-400 font-medium">Completed</div>
            <div className="text-xs text-gray-500 mt-1">Successfully delivered</div>
          </div>
        </div>

        {/* My Services */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">My Services</h2>
              <p className="text-gray-400">Manage and update your service offerings</p>
            </div>
            <button className="bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-lime-400/25 transform hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Service
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:border-lime-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/10 hover:scale-[1.02]">
                {editingService === service.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Service Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all"
                        placeholder="Service name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all h-24 resize-none"
                        placeholder="Description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                      <input
                        type="text"
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all"
                        placeholder="Price"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSaveService}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors mb-2">{service.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-lime-400/10 text-lime-400 text-sm font-medium px-3 py-1 rounded-full border border-lime-400/20">
                            {service.price}
                          </span>
                          <span className="text-xs text-gray-500">per service</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditService(service)}
                        className="p-2 bg-gray-800/50 hover:bg-lime-400/10 text-gray-400 hover:text-lime-400 rounded-xl transition-all duration-300 hover:scale-110"
                        title="Edit service"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {service.institution}
                      </div>
                      <div className="flex gap-2">
                        {service.paymentMethods?.slice(0, 2).map((method, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-lg border border-gray-600/30"
                            title={method.instructions}
                          >
                            {method.type === 'mpesa' && '📱 M-Pesa'}
                            {method.type === 'bank' && '🏦 Bank'}
                            {method.type === 'cash' && '💵 Cash'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Recent Bookings</h2>
              <p className="text-gray-400">Manage your customer bookings and requests</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">{bookings.filter(b => b.status === 'Pending').length} pending</span>
            </div>
          </div>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="group bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:border-lime-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-lime-400 transition-colors">{booking.service}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {booking.customer}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {booking.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                      booking.status === 'Pending' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                      booking.status === 'Confirmed' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                      booking.status === 'Completed' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                      'bg-gray-400/10 text-gray-400 border border-gray-400/20'
                    }`}>
                      {booking.status}
                    </div>
                    {booking.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chats */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Active Chats</h2>
              <p className="text-gray-400">Communicate with your customers</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">{activeChats.filter(c => c.unreadCount > 0).length} unread</span>
            </div>
          </div>
          {activeChats.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-lime-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Active Conversations</h3>
              <p className="text-gray-400 max-w-md mx-auto">Students will appear here when they contact you about your services. Stay connected and responsive to grow your business!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleOpenChat(chat)}
                  className="group bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 cursor-pointer hover:border-lime-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/10 hover:scale-[1.01]"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {chat.student.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-gray-900 ${
                          chat.student.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-lime-400 transition-colors truncate">{chat.student.name}</h3>
                          <span className="bg-green-600/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full border border-green-600/30">
                            Student
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-1 font-medium">{chat.service}</p>
                        <p className="text-sm text-gray-300 truncate max-w-md group-hover:text-white transition-colors">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="text-xs text-gray-500 font-medium">
                        {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="bg-gradient-to-r from-lime-400 to-lime-500 text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-2 shadow-lg">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Quick Actions</h2>
            <p className="text-gray-400">Common tasks and shortcuts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={handleReportStudent}
              className="group bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Report Student</div>
                  <div className="text-sm text-red-100">Flag inappropriate behavior</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/vendor/add-service'}
              className="group bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Add New Service</div>
                  <div className="text-sm text-green-100">Expand your offerings</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/vendor/analytics'}
              className="group bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Service Analytics</div>
                  <div className="text-sm text-purple-100">Track performance & insights</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Chat Modal */}
        {showChatModal && selectedChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl w-full max-w-2xl h-[80vh] max-h-[600px] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Chat with {selectedChat.student.name}</h3>
                <button
                  onClick={handleCloseChat}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-full">
                <VendorStudentChat
                  currentUser={{ id: 'vendor', name: user?.name || 'Vendor', role: 'vendor' }}
                  targetUser={selectedChat.student}
                  initialMessages={selectedChat.messages}
                />
              </div>
            </div>
          </div>
        )}

        {/* Report Student Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#151515] border border-gray-800 rounded-xl p-6 w-[400px] max-w-[90vw]">
              <h3 className="text-lg font-semibold mb-4">Report Student</h3>
              <p className="text-sm text-gray-400 mb-4">
                Report a student for inappropriate behavior or booking violations.
              </p>

              <input
                type="email"
                value={reportForm.studentEmail}
                onChange={(e) => setReportForm({...reportForm, studentEmail: e.target.value})}
                className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white mb-3"
                placeholder="Student email address"
              />

              <textarea
                value={reportForm.reason}
                onChange={(e) => setReportForm({...reportForm, reason: e.target.value})}
                className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white h-24 mb-4"
                placeholder="Describe the issue..."
              />

              <div className="flex gap-3">
                <button
                  onClick={submitStudentReport}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded transition-colors"
                >
                  Submit Report
                </button>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportForm({ studentEmail: '', reason: '' });
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
    </div>
  );
}
