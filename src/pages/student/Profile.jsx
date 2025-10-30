// src/pages/student/Profile.jsx
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
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
    updateProfile({ name, email });
    alert("Profile updated successfully!");
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-6">My Profile</h2>

      <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
        {/* Profile Image Section */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-lime-400 text-black rounded-full p-1 hover:bg-lime-500 transition-colors"
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
          <div>
            <h3 className="text-lg font-semibold">{user?.name || "Student"}</h3>
            <p className="text-gray-400">{user?.role}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white"
              placeholder="Enter your email"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 rounded transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
