// src/App.jsx
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ServicesPage from "./pages/ServicesPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AIChatBox from "./components/AIChatBox";
import ScrollToTop from "./components/ScrollToTop";

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

// Vendor pages
import AddService from "./pages/vendor/AddService";
import ManageServices from "./pages/vendor/ManageServices";
import RevenueReport from "./pages/vendor/RevenueReport";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-900/50 backdrop-blur-[1px]"></div>

      {/* Particle Effects */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="relative z-10">
        <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/services" element={<ServicesPage />} />
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

        {/* Protected vendor routes */}
        <Route element={<ProtectedRoute role="vendor" />}>
          <Route path="/vendor/add-service" element={<AddService />} />
          <Route path="/vendor/manage-services" element={<ManageServices />} />
          <Route path="/vendor/analytics" element={<RevenueReport />} />
        </Route>
        </Routes>

        {/* Global Components */}
        <AIChatBox />
        <ScrollToTop />
      </div>
    </div>
  );
}
