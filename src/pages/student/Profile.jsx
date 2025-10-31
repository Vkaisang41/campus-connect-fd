// src/pages/student/Profile.jsx
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateProfile, bookings } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [university, setUniversity] = useState(user?.university || "");
  const [major, setMajor] = useState(user?.major || "");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setProfileImage(imageData);
        updateProfile({ profileImage: imageData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({
      name,
      email,
      phone,
      bio,
      university,
      major
    });
    alert("Profile updated successfully!");
  };

  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const totalSpent = bookings.reduce((total, booking) => {
    const price = parseFloat(booking.price.replace(/[^0-9.-]+/g, "")) || 0;
    return total + price;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-400 text-lg">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 sticky top-8">
              {/* Profile Image Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-600">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-lime-400 text-black rounded-full p-2 hover:bg-lime-500 transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <h3 className="text-xl font-semibold">{user?.name || "Student"}</h3>
                <p className="text-gray-400 capitalize">{user?.role}</p>
                <p className="text-sm text-lime-400 mt-1">Active Member</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Bookings</p>
                      <p className="text-2xl font-bold text-lime-400">{bookings.length}</p>
                    </div>
                    <div className="text-lime-400/60">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-green-400">{completedBookings}</p>
                    </div>
                    <div className="text-green-400/60">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Spent</p>
                      <p className="text-2xl font-bold text-blue-400">${totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="text-blue-400/60">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">University</label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="Your university name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Major/Field of Study</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="Your field of study"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-400/25"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setName(user?.name || "");
                    setEmail(user?.email || "");
                    setPhone(user?.phone || "");
                    setBio(user?.bio || "");
                    setUniversity(user?.university || "");
                    setMajor(user?.major || "");
                  }}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive booking updates and reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-400/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">SMS Notifications</h3>
                    <p className="text-sm text-gray-400">Get instant updates via text message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-400/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Marketing Emails</h3>
                    <p className="text-sm text-gray-400">Receive special offers and campus updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-400/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-gradient-to-br from-red-900/10 to-red-800/5 border border-red-900/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
              <p className="text-gray-400 text-sm mb-4">
                These actions cannot be undone. Please be certain before proceeding.
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 rounded-lg transition-colors text-sm">
                  Delete Account
                </button>
                <button className="px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 border border-gray-600/30 rounded-lg transition-colors text-sm">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
