import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddService() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    duration: '',
    availability: 'available',
    institution: 'University of Nairobi',
    paymentMethods: []
  });
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'mpesa',
    method: 'paybill',
    businessNumber: '',
    accountNumber: '',
    bankName: '',
    accountName: '',
    instructions: ''
  });

  const addPaymentMethod = () => {
    if (paymentMethod.type === 'mpesa') {
      if (!paymentMethod.businessNumber || !paymentMethod.accountNumber) {
        alert('Please fill in all M-Pesa payment details');
        return;
      }
      const method = {
        type: 'mpesa',
        method: paymentMethod.method,
        businessNumber: paymentMethod.businessNumber,
        accountNumber: paymentMethod.accountNumber,
        instructions: paymentMethod.method === 'paybill'
          ? `Pay via M-Pesa Paybill ${paymentMethod.businessNumber}, Account: ${paymentMethod.accountNumber}`
          : `Pay via M-Pesa Buy Goods & Services, Till: ${paymentMethod.businessNumber}`
      };
      setFormData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, method]
      }));
    } else if (paymentMethod.type === 'bank') {
      if (!paymentMethod.bankName || !paymentMethod.accountNumber || !paymentMethod.accountName) {
        alert('Please fill in all bank transfer details');
        return;
      }
      const method = {
        type: 'bank',
        bankName: paymentMethod.bankName,
        accountNumber: paymentMethod.accountNumber,
        accountName: paymentMethod.accountName,
        instructions: `Bank transfer to ${paymentMethod.bankName} account ${paymentMethod.accountNumber}`
      };
      setFormData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, method]
      }));
    } else if (paymentMethod.type === 'cash') {
      const method = {
        type: 'cash',
        instructions: paymentMethod.instructions || 'Cash payment at pickup/delivery'
      };
      setFormData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, method]
      }));
    }

    // Reset payment method form
    setPaymentMethod({
      type: 'mpesa',
      method: 'paybill',
      businessNumber: '',
      accountNumber: '',
      bankName: '',
      accountName: '',
      instructions: ''
    });
  };

  const removePaymentMethod = (index) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethods.length === 0) {
      alert('Please add at least one payment method');
      return;
    }
    // Handle form submission
    console.log('Service data:', formData);
    alert('Service submitted for admin approval!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl font-bold">Add New Service</h1>
          <p className="text-gray-400 text-lg mt-2">
            Create a new service to offer to students
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#111] border border-[#262626] rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Service Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
                placeholder="e.g., Laundry Service"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
                placeholder="Describe your service..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (KES)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration (hours)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
                  placeholder="2"
                  min="0.5"
                  step="0.5"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-lime-400 focus:outline-none"
                required
              >
                <option value="">Select a category</option>
                <option value="laundry">Laundry</option>
                <option value="printing">Printing</option>
                <option value="tutoring">Tutoring</option>
                <option value="cleaning">Cleaning</option>
                <option value="food">Food Delivery</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Institution</label>
              <select
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-lime-400 focus:outline-none"
                required
              >
                <option value="University of Nairobi">University of Nairobi</option>
                <option value="Kenyatta University">Kenyatta University</option>
                <option value="Strathmore University">Strathmore University</option>
                <option value="United States International University">United States International University</option>
                <option value="Jomo Kenyatta University of Agriculture and Technology">Jomo Kenyatta University of Agriculture and Technology</option>
              </select>
            </div>

            {/* Payment Methods Section */}
            <div>
              <label className="block text-sm font-medium mb-4">Payment Methods</label>

              {/* Add Payment Method Form */}
              <div className="bg-[#222] border border-gray-600 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Payment Type</label>
                    <select
                      value={paymentMethod.type}
                      onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                      className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                    >
                      <option value="mpesa">M-Pesa</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>

                  {paymentMethod.type === 'mpesa' && (
                    <div>
                      <label className="block text-xs font-medium mb-1">M-Pesa Method</label>
                      <select
                        value={paymentMethod.method}
                        onChange={(e) => setPaymentMethod({...paymentMethod, method: e.target.value})}
                        className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                      >
                        <option value="paybill">Paybill</option>
                        <option value="till">Buy Goods & Services</option>
                      </select>
                    </div>
                  )}
                </div>

                {paymentMethod.type === 'mpesa' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        {paymentMethod.method === 'paybill' ? 'Business Number' : 'Till Number'}
                      </label>
                      <input
                        type="text"
                        value={paymentMethod.businessNumber}
                        onChange={(e) => setPaymentMethod({...paymentMethod, businessNumber: e.target.value})}
                        className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                        placeholder={paymentMethod.method === 'paybill' ? "e.g., 123456" : "e.g., 987654"}
                      />
                    </div>
                    {paymentMethod.method === 'paybill' && (
                      <div>
                        <label className="block text-xs font-medium mb-1">Account Number</label>
                        <input
                          type="text"
                          value={paymentMethod.accountNumber}
                          onChange={(e) => setPaymentMethod({...paymentMethod, accountNumber: e.target.value})}
                          className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                          placeholder="e.g., LAUNDRY001"
                        />
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod.type === 'bank' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={paymentMethod.bankName}
                        onChange={(e) => setPaymentMethod({...paymentMethod, bankName: e.target.value})}
                        className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                        placeholder="e.g., KCB Bank"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Account Number</label>
                      <input
                        type="text"
                        value={paymentMethod.accountNumber}
                        onChange={(e) => setPaymentMethod({...paymentMethod, accountNumber: e.target.value})}
                        className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                        placeholder="e.g., 1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Account Name</label>
                      <input
                        type="text"
                        value={paymentMethod.accountName}
                        onChange={(e) => setPaymentMethod({...paymentMethod, accountName: e.target.value})}
                        className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                        placeholder="Account holder name"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod.type === 'cash' && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium mb-1">Cash Payment Instructions</label>
                    <input
                      type="text"
                      value={paymentMethod.instructions}
                      onChange={(e) => setPaymentMethod({...paymentMethod, instructions: e.target.value})}
                      className="w-full bg-[#333] border border-gray-500 rounded px-3 py-2 text-white text-sm"
                      placeholder="e.g., Cash payment at pickup/delivery"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={addPaymentMethod}
                  className="bg-lime-600 hover:bg-lime-500 text-black px-4 py-2 rounded text-sm font-medium"
                >
                  Add Payment Method
                </button>
              </div>

              {/* Display Added Payment Methods */}
              {formData.paymentMethods.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Added Payment Methods:</h4>
                  {formData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#222] border border-gray-600 rounded px-3 py-2">
                      <div className="text-sm">
                        {method.type === 'mpesa' && (
                          <span>M-Pesa {method.method === 'paybill' ? 'Paybill' : 'Till'}: {method.businessNumber}
                          {method.accountNumber && ` (Account: ${method.accountNumber})`}</span>
                        )}
                        {method.type === 'bank' && (
                          <span>Bank: {method.bankName} - {method.accountNumber}</span>
                        )}
                        {method.type === 'cash' && (
                          <span>Cash: {method.instructions}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removePaymentMethod(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-lime-400 focus:outline-none"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-lime-600 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Add Service
              </button>
              <Link
                to="/vendor/dashboard"
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}