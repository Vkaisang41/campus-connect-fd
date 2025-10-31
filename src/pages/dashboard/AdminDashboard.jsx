import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchServices } from "../../services/serviceApi";

export default function AdminDashboard() {
  const { reports, notifications, markNotificationAsRead, getUnreadNotifications } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 245,
    totalServices: 0,
    totalBookings: 89,
    pendingApprovals: 12,
    pendingReports: 0
  });
  const [services, setServices] = useState([]);
  const [pendingServices, setPendingServices] = useState([]);

  useEffect(() => {
    fetchServices().then(allServices => {
      setServices(allServices);
      setStats(prev => ({
        ...prev,
        totalServices: allServices.length,
        pendingReports: reports.filter(r => r.status === 'Pending').length
      }));

      // Mock pending services for approval
      setPendingServices([
        { id: 10, name: "New Catering Service", vendor: "Fresh Bites", status: "Pending" },
        { id: 11, name: "Event Planning", vendor: "Campus Events Co", status: "Pending" },
      ]);
    });
  }, [reports]);

  const approveService = (serviceId) => {
    setPendingServices(pendingServices.filter(s => s.id !== serviceId));
    setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
  };

  const rejectService = (serviceId) => {
    setPendingServices(pendingServices.filter(s => s.id !== serviceId));
    setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white px-8 py-10">
      <div className="max-w-[1200px] mx-auto">
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
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 text-lg mt-2">
            System overview & user/service moderation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.totalUsers}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-green-400">{stats.totalServices}</div>
            <div className="text-sm text-gray-400">Active Services</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-yellow-400">{stats.totalBookings}</div>
            <div className="text-sm text-gray-400">Total Bookings</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded p-4">
            <div className="text-2xl font-bold text-red-400">{stats.pendingReports}</div>
            <div className="text-sm text-gray-400">Pending Reports</div>
          </div>
        </div>

        {/* Pending Service Approvals */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Pending Service Approvals</h2>
          {pendingServices.length === 0 ? (
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <p className="text-gray-500 text-sm">No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingServices.map((service) => (
                <div key={service.id} className="bg-[#111] border border-[#262626] rounded p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-sm text-gray-400">Vendor: {service.vendor}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveService(service.id)}
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectService(service.id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Reports */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Pending Reports</h2>
          {reports.filter(r => r.status === 'Pending').length === 0 ? (
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <p className="text-gray-500 text-sm">No pending reports</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.filter(r => r.status === 'Pending').map((report) => (
                <div key={report.id} className="bg-[#111] border border-[#262626] rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm">
                        {report.type === 'student_to_vendor' ? 'Student Report' : 'Vendor Report'}
                      </div>
                      <div className="text-xs text-gray-400">
                        Reported by: {report.reporter}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{report.description}</p>
                  <div className="flex gap-2">
                    <button className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs">
                      Investigate
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Services Overview */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">System Services Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="bg-[#111] border border-[#262626] rounded p-4">
                <h3 className="font-semibold text-sm">{service.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{service.vendorName}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-lime-400">{service.price}</span>
                  <span className="text-xs text-yellow-400">★ {service.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => {
                const users = JSON.parse(localStorage.getItem("users") || "[]");
                alert(`Total registered users: ${users.length}\n\n${users.map(u => `${u.name} (${u.role}) - ${u.email}`).join('\n')}`);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded text-sm"
            >
              Manage Users
            </button>
            <button
              onClick={() => {
                const newService = {
                  id: Date.now(),
                  name: "New Admin Service",
                  description: "Service added by admin",
                  price: "$50",
                  vendorName: "Admin Services",
                  rating: 5.0
                };
                const services = JSON.parse(localStorage.getItem("services") || "[]");
                services.push(newService);
                localStorage.setItem("services", JSON.stringify(services));
                alert('New service added successfully!');
                window.location.reload();
              }}
              className="bg-green-600 hover:bg-green-500 text-white p-3 rounded text-sm"
            >
              Add New Service
            </button>
            <button
              onClick={() => {
                const settings = {
                  maintenance: false,
                  notifications: true,
                  maxBookings: 10,
                  lastUpdated: new Date().toISOString()
                };
                localStorage.setItem("systemSettings", JSON.stringify(settings));
                alert('System settings updated!\n\nMaintenance: Off\nNotifications: On\nMax Bookings: 10');
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded text-sm"
            >
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
