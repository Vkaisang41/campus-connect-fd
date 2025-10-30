// src/pages/student/Services.jsx
import { useEffect, useState } from "react";
import { fetchServices } from "../../services/serviceApi";
import { useAuth } from "../../context/AuthContext";

export default function Services() {
  const [services, setServices] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const { addBooking, addReport, user } = useAuth();

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  const handleBookService = (service) => {
    addBooking({
      service: service.name,
      vendor: service.vendorName,
      price: service.price,
    });
    alert(`Booking request sent for ${service.name}!`);
  };

  const handleReportVendor = (vendorName) => {
    setSelectedVendor(vendorName);
    setShowReportModal(true);
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
      <h2 className="text-xl font-bold mb-6">Available Services</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {["All", "Laundry", "Printing", "Tutoring", "Food & Beverage", "Transportation", "Technology", "Academic Services", "Creative Services", "Automotive"].map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded text-sm ${
                category === "All"
                  ? "bg-lime-400 text-black"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-[#151515] border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm text-gray-300">{s.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">{s.vendorName}</p>
            <p className="text-xs text-gray-500 mb-2">({s.reviews} reviews)</p>
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{s.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-lime-400 font-medium">{s.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleReportVendor(s.vendorName)}
                  className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded"
                  title="Report this vendor"
                >
                  Report
                </button>
                <button
                  onClick={() => handleBookService(s)}
                  className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-3 py-2 rounded transition-colors text-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
