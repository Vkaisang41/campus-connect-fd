import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServices } from "../services/serviceApi";
import { useAuth } from "../context/AuthContext";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const { addBooking } = useAuth();

  useEffect(() => {
    fetchServices().then(setServices);
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
    addBooking({
      service: service.name,
      vendor: service.vendorName,
      price: service.price,
    });
    alert(`Booking request sent for ${service.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Browse Services</h1>
          <p className="text-gray-400 text-lg">Discover and book campus services with ease</p>
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
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-80 bg-[#0f0f0f] border border-gray-800 p-6 rounded-xl hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-300 group"
            >
              {service.image && (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white group-hover:text-lime-400 transition-colors mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-400">{service.vendorName}</p>
                </div>
                <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded-full">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm text-gray-300 font-medium">{service.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({service.reviews})</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-lime-400">{service.price}</span>
                  <span className="text-xs text-gray-500">per service</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>~30 min</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleBookService(service)}
                  className="flex-1 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-semibold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-400/25"
                >
                  Book Now
                </button>
                <button className="p-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Categories Info */}
        <div className="mt-16 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Service Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0e0e0e] border border-gray-700 rounded-lg p-6">
              <img src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=80&h=80&fit=crop&crop=center" alt="Laundry Services" className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Laundry Services</h3>
              <p className="text-gray-400 text-sm mb-3">Professional wash, dry, and fold services with pickup/delivery options.</p>
              <div className="text-lime-400 font-medium">From $5/kg</div>
            </div>

            <div className="bg-[#0e0e0e] border border-gray-700 rounded-lg p-6">
              <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=center" alt="Printing Services" className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Printing Services</h3>
              <p className="text-gray-400 text-sm mb-3">High-quality printing, copying, and binding services available 24/7.</p>
              <div className="text-lime-400 font-medium">From $0.20/page</div>
            </div>

            <div className="bg-[#0e0e0e] border border-gray-700 rounded-lg p-6">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop&crop=center" alt="Tutoring Services" className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Tutoring Services</h3>
              <p className="text-gray-400 text-sm mb-3">Expert academic support across all subjects with qualified tutors.</p>
              <div className="text-lime-400 font-medium">From $25/hour</div>
            </div>

            <div className="bg-[#0e0e0e] border border-gray-700 rounded-lg p-6">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop&crop=center" alt="Food & Beverage" className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Food & Beverage</h3>
              <p className="text-gray-400 text-sm mb-3">Campus dining, catering, and food delivery services.</p>
              <div className="text-lime-400 font-medium">From $8/meal</div>
            </div>

            <div className="bg-[#0e0e0e] border border-gray-700 rounded-lg p-6">
              <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=80&h=80&fit=crop&crop=center" alt="Transportation" className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Transportation</h3>
              <p className="text-gray-400 text-sm mb-3">Ride sharing, bike rentals, and campus shuttle services.</p>
              <div className="text-lime-400 font-medium">From $5/ride</div>
            </div>

            <div className="bg-[#0e0e0e] border border-gray-700 rounded-lg p-6">
              <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=80&h=80&fit=crop&crop=center" alt="Technology Services" className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Technology Services</h3>
              <p className="text-gray-400 text-sm mb-3">Computer repair, software support, and tech consultations.</p>
              <div className="text-lime-400 font-medium">From $15/hour</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-gradient-to-r from-lime-400/5 to-blue-400/5 border border-lime-400/10 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">How CampusConnect Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=64&h=64&fit=crop&crop=center" alt="Browse & Select" className="w-8 h-8 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-white mb-2">1. Browse & Select</h3>
              <p className="text-gray-400 text-sm">Search through our extensive catalog of campus services and find what you need.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=64&h=64&fit=crop&crop=center" alt="Book Instantly" className="w-8 h-8 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-white mb-2">2. Book Instantly</h3>
              <p className="text-gray-400 text-sm">Book services with just one click. Get instant confirmation and updates.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=64&h=64&fit=crop&crop=center" alt="Enjoy Service" className="w-8 h-8 object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-white mb-2">3. Enjoy Service</h3>
              <p className="text-gray-400 text-sm">Receive your service at the promised time with our quality guarantee.</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=120&h=120&fit=crop&crop=center" alt="No services found" className="w-30 h-30 object-cover rounded-full mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-semibold text-white mb-2">No services found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("rating");
              }}
              className="px-6 py-3 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 border border-lime-400/20 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
