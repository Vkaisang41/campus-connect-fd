export default function ServiceDetails({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#131313] border border-[#222] rounded-xl w-[400px] p-5 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-red-400"
        >
          ✕
        </button>

        {service.image && (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <h2 className="text-lg font-semibold mb-2">{service.name}</h2>
        <p className="text-gray-400 text-xs mb-3">{service.description}</p>

        <div className="text-sm space-y-2">
          <div className="mb-2">
            <span className="text-lime-400 font-bold">{service.price}</span>
          </div>
          <div className="text-yellow-300">⭐ {service.rating} ({service.reviews} reviews)</div>
          <div className="text-gray-300">
            <strong>Vendor:</strong> {service.vendorName}
          </div>
          {service.category && (
            <div className="text-gray-300">
              <strong>Category:</strong> {service.category}
            </div>
          )}
          {service.availability && (
            <div className="text-gray-300">
              <strong>Availability:</strong> {service.availability}
            </div>
          )}
          {service.vendorContact && (
            <div className="text-gray-300">
              <strong>Contact:</strong> {service.vendorContact}
            </div>
          )}
        </div>

        <button
          className="mt-4 w-full py-2 bg-lime-400 text-black font-semibold rounded"
          onClick={onClose}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
