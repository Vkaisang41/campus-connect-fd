import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchServices } from "../../services/serviceApi";

export default function VendorDashboard() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

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

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-8 py-10">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-xl font-semibold">My Services</h1>
        <p className="text-gray-400 text-sm mt-2">
          Manage bookings & update service listings.
        </p>

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
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lime-400 font-medium">{service.price}</span>
                  <button className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
                    Edit
                  </button>
                </div>
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
      </div>
    </div>
  );
}
