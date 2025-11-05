import { useState } from "react";
import ServiceDetails from "./modals/ServiceDetails";

export default function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-72 bg-[#131313] border border-[#222] rounded-xl p-4 text-sm transition-all duration-300 hover:scale-[1.02] hover:border-lime-400 hover:shadow-xl hover:shadow-lime-600/20 cursor-pointer"
      >
        {service.image && (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        )}
        <p className="text-gray-300 mb-1 font-semibold">{service.name}</p>
        <p className="text-[11px] text-gray-500 mb-3">{service.description}</p>

        <div className="flex justify-between text-xs">
          <span className="text-lime-400 font-semibold">{service.price}</span>
          <span className="text-yellow-300">⭐ {service.rating}</span>
        </div>
      </div>

      {open && <ServiceDetails service={service} onClose={() => setOpen(false)} />}
    </>
  );
}
