// src/App.jsx
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import ProtectedRoute from "./components/ProtectedRoute";

// Dashboard pages
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Other pages
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import FAQPage from "./pages/FAQPage";
import HelpPage from "./pages/HelpPage";

// Student pages
import StudentLayout from "./pages/student/StudentLayout";
import Overview from "./pages/student/Overview";
import Services from "./pages/student/Services";
import Bookings from "./pages/student/Bookings";
import Profile from "./pages/student/Profile";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/help" element={<HelpPage />} />

      {/* Dashboard routes */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>
      <Route element={<ProtectedRoute role="vendor" />}>
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Protected student routes */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Overview />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}
