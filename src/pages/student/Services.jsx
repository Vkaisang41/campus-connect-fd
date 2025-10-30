// src/pages/student/Services.jsx
import { useEffect, useState } from "react";
import { fetchServices } from "../../services/serviceApi";
import { useAuth } from "../../context/AuthContext";

export default function Services() {
  const [services, setServices] = useState([]);
  const { addBooking } = useAuth();

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

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-6">Available Services</h2>

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
              <button
                onClick={() => handleBookService(s)}
                className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 py-2 rounded transition-colors text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
