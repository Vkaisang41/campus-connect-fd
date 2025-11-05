import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchServices } from '../../services/serviceApi';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    // Load services for this vendor
    fetchServices().then(allServices => {
      // Filter services by this vendor (in a real app, this would come from API)
      const vendorServices = allServices.filter(s =>
        s.vendorName === "CleanWave Laundry" ||
        s.vendorName === "SwiftPrint" ||
        s.vendorName === "TutorHub"
      );
      setServices(vendorServices);
    });
  }, []);

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

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
      alert('Service deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/vendor/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <p className="text-gray-400 text-lg mt-2">
            View, edit, and manage your services
          </p>
        </div>

        {/* Add New Service Button */}
        <div className="mb-6">
          <Link
            to="/vendor/add-service"
            className="bg-lime-600 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Service
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-[#111] border border-[#262626] rounded-xl p-6">
              {editingService === service.id ? (
                <div className="space-y-4">
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
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm flex-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <span className="text-lime-400 font-medium">{service.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{service.vendorName}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditService(service)}
                        className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-sm bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No services yet</h3>
            <p className="text-gray-400 mb-6">Start by adding your first service</p>
            <Link
              to="/vendor/add-service"
              className="bg-lime-600 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Add Your First Service
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}