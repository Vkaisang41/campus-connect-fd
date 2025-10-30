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
            className="bg-[#151515] border border-gray-800 p-4 rounded-xl"
          >
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-400">{s.vendorName}</p>
            <p className="mt-2 text-lime-400 font-medium">{s.price}</p>
            <button
              onClick={() => handleBookService(s)}
              className="mt-3 w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 rounded transition-colors"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
