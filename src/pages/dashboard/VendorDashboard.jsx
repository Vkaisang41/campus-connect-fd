import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchServices } from "../../services/serviceApi";

export default function VendorDashboard() {
  const { user, addReport, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '' });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({ studentEmail: '', reason: '' });

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

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Logout */}
        <div className="mb-8">
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
          <h1 className="heading-lg text-gradient">Vendor Dashboard</h1>
          <p className="body-md text-gray-400 mt-3 max-w-2xl">
            Manage your services, track bookings, and grow your business on the CampusConnect platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-lime-400">{services.length}</div>
            <div className="text-sm text-gray-400">Active Services</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-yellow-400">{bookings.filter(b => b.status === 'Pending').length}</div>
            <div className="text-sm text-gray-400">Pending Bookings</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-green-400">{bookings.filter(b => b.status === 'Confirmed').length}</div>
            <div className="text-sm text-gray-400">Confirmed</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-blue-400">{bookings.filter(b => b.status === 'Completed').length}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
        </div>

        {/* My Services */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">My Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="bg-[#111] border border-[#262626] rounded p-4">
                {editingService === service.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full bg-[#222] border border-gray-600 rounded px-3 py-2 text-white"
                      placeholder="Service name"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full bg-[#222] border border-gray-600 rounded px-3 py-2 text-white h-20"
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      className="w-full bg-[#222] border border-gray-600 rounded px-3 py-2 text-white"
                      placeholder="Price"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveService}
                        className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-lime-400 font-medium">{service.price}</span>
                      <button
                        onClick={() => handleEditService(service)}
                        className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-[#111] border border-[#262626] rounded p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{booking.service}</div>
                  <div className="text-sm text-gray-400">{booking.customer} • {booking.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    booking.status === 'Pending' ? 'text-yellow-400' :
                    booking.status === 'Confirmed' ? 'text-green-400' :
                    booking.status === 'Completed' ? 'text-blue-400' :
                    'text-gray-400'
                  }`}>
                    {booking.status}
                  </span>
                  {booking.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                        className="text-xs bg-green-600 hover:bg-green-500 px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                        className="text-xs bg-red-600 hover:bg-red-500 px-2 py-1 rounded"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleReportStudent}
              className="bg-red-600 hover:bg-red-500 text-white p-3 rounded text-sm"
            >
              Report Student
            </button>
            <button
              onClick={() => window.location.href = '/vendor/add-service'}
              className="bg-green-600 hover:bg-green-500 text-white p-3 rounded text-sm"
            >
              Add New Service
            </button>
            <button
              onClick={() => window.location.href = '/vendor/analytics'}
              className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded text-sm"
            >
              Service Analytics
            </button>
          </div>
        </div>

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
