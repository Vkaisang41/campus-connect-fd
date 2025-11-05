import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchServices } from "../../services/serviceApi";

export default function AdminDashboard() {
  const { reports, notifications, markNotificationAsRead, getUnreadNotifications, logout, user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 245,
    totalServices: 0,
    totalBookings: 89,
    pendingApprovals: 12,
    pendingReports: 0,
    totalInstitutions: 5
  });
  const [services, setServices] = useState([]);
  const [pendingServices, setPendingServices] = useState([]);
  const [institutions, setInstitutions] = useState([
    { id: 1, name: "University of Nairobi", adminEmail: "admin@uon.ac.ke", status: "Active", vendors: 12, students: 45 },
    { id: 2, name: "Kenyatta University", adminEmail: "admin@ku.ac.ke", status: "Active", vendors: 8, students: 32 },
    { id: 3, name: "Strathmore University", adminEmail: "admin@strathmore.edu", status: "Active", vendors: 15, students: 28 },
    { id: 4, name: "United States International University", adminEmail: "admin@usiu.ac.ke", status: "Active", vendors: 6, students: 18 },
    { id: 5, name: "Jomo Kenyatta University of Agriculture and Technology", adminEmail: "admin@jkuat.ac.ke", status: "Active", vendors: 9, students: 22 }
  ]);
  const [pendingVendors, setPendingVendors] = useState([
    { id: 1, name: "John Laundry Services", email: "john@laundry.com", institution: "University of Nairobi", serviceType: "Laundry", status: "Pending" },
    { id: 2, name: "TechFix Solutions", email: "info@techfix.co.ke", institution: "Kenyatta University", serviceType: "IT Support", status: "Pending" }
  ]);

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
        {/* Header with Back Button and Logout */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Welcome,</div>
                <div className="text-white font-medium">{user?.name || user?.email || 'Admin'}</div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                    window.location.href = '/';
                  }
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
          <h1 className="heading-lg text-gradient">Admin Dashboard</h1>
          <p className="body-md text-gray-400 mt-3 max-w-2xl">
            Comprehensive system overview and user/service moderation platform for managing institutions, vendors, and platform operations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <div className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-blue-400">{stats.totalUsers}</div>
              <svg className="w-8 h-8 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Users</div>
            <div className="text-xs text-gray-500 mt-1">Active platform users</div>
          </div>
          <div className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-green-400">{stats.totalServices}</div>
              <svg className="w-8 h-8 text-green-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-sm text-gray-400 font-medium">Active Services</div>
            <div className="text-xs text-gray-500 mt-1">Approved services</div>
          </div>
          <div className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-yellow-400">{stats.totalBookings}</div>
              <svg className="w-8 h-8 text-yellow-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Bookings</div>
            <div className="text-xs text-gray-500 mt-1">Service requests</div>
          </div>
          <div className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-purple-400">{stats.totalInstitutions}</div>
              <svg className="w-8 h-8 text-purple-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-sm text-gray-400 font-medium">Institutions</div>
            <div className="text-xs text-gray-500 mt-1">Partner universities</div>
          </div>
          <div className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold text-red-400">{stats.pendingReports}</div>
              <svg className="w-8 h-8 text-red-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-sm text-gray-400 font-medium">Pending Reports</div>
            <div className="text-xs text-gray-500 mt-1">Requires attention</div>
          </div>
        </div>

        {/* Institution Management */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-md text-gradient">Institution Management</h2>
            <button
              onClick={() => {
                const newInstitution = {
                  id: Date.now(),
                  name: prompt("Enter institution name:"),
                  adminEmail: prompt("Enter admin email:"),
                  status: "Active",
                  vendors: 0,
                  students: 0
                };
                if (newInstitution.name && newInstitution.adminEmail) {
                  setInstitutions([...institutions, newInstitution]);
                  setStats(prev => ({ ...prev, totalInstitutions: prev.totalInstitutions + 1 }));
                  alert('Institution added successfully!');
                }
              }}
              className="btn-modern glass-hover px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-500 text-black font-semibold flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Institution
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutions.map((institution) => (
              <div key={institution.id} className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">{institution.name}</h3>
                    <p className="font-primary text-sm text-gray-400">{institution.adminEmail}</p>
                  </div>
                  <span className={`status-badge ${
                    institution.status === 'Active' ? 'status-confirmed' : 'status-pending'
                  }`}>
                    {institution.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400">{institution.vendors}</div>
                    <div className="text-xs text-gray-400">Vendors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">{institution.students}</div>
                    <div className="text-xs text-gray-400">Students</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 btn-modern glass-hover px-3 py-2 rounded-lg text-sm font-medium text-lime-400 border border-lime-400/30 hover:border-lime-400/60">
                    View Details
                  </button>
                  <button className="btn-modern glass-hover px-3 py-2 rounded-lg text-sm font-medium text-gray-400 border border-gray-600 hover:border-gray-500">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Vendor Approvals */}
        <div className="mt-8">
          <h2 className="heading-md text-gradient mb-6">Pending Vendor Approvals</h2>
          {pendingVendors.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">All Caught Up!</h3>
              <p className="text-gray-500 text-sm">No pending vendor approvals at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="glass card-modern rounded-xl p-6 hover:border-lime-400/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-lime-400/20 to-blue-400/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-white">{vendor.name}</h3>
                        <p className="font-primary text-sm text-gray-400">{vendor.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                            {vendor.institution}
                          </span>
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                            {vendor.serviceType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setPendingVendors(pendingVendors.filter(v => v.id !== vendor.id));
                          alert(`Vendor ${vendor.name} approved successfully!`);
                        }}
                        className="btn-modern glass-hover px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setPendingVendors(pendingVendors.filter(v => v.id !== vendor.id));
                          alert(`Vendor ${vendor.name} rejected.`);
                        }}
                        className="btn-modern glass-hover px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Service Approvals */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Pending Service Approvals</h2>
          {pendingServices.length === 0 ? (
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <p className="text-gray-500 text-sm">No pending service approvals</p>
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

        {/* All Reports Management */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Reports Management</h2>

          {/* Report Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <div className="text-2xl font-bold text-red-400">{reports.filter(r => r.status === 'Pending').length}</div>
              <div className="text-sm text-gray-400">Pending Reports</div>
            </div>
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <div className="text-2xl font-bold text-blue-400">{reports.filter(r => r.type === 'student_to_vendor').length}</div>
              <div className="text-sm text-gray-400">Student Reports</div>
            </div>
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <div className="text-2xl font-bold text-purple-400">{reports.filter(r => r.type === 'vendor_to_student').length}</div>
              <div className="text-sm text-gray-400">Vendor Reports</div>
            </div>
          </div>

          {/* Reports List */}
          {reports.length === 0 ? (
            <div className="bg-[#111] border border-[#262626] rounded p-4">
              <p className="text-gray-500 text-sm">No reports found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="bg-[#111] border border-[#262626] rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-sm">
                          {report.type === 'student_to_vendor' ? 'Student Report' : 'Vendor Report'}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          report.status === 'Pending' ? 'bg-yellow-600 text-white' :
                          report.status === 'Investigating' ? 'bg-blue-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Reported by: {report.reporter}
                      </div>
                      <div className="text-xs text-gray-400">
                        Reported Entity: {report.reportedEntity}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{report.description}</p>
                  <div className="flex gap-2">
                    {report.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => {
                            // Mark as investigating
                            alert(`Starting investigation for report: ${report.description}`);
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Investigate
                        </button>
                        <button
                          onClick={() => {
                            // Dismiss report
                            alert('Report dismissed');
                          }}
                          className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Dismiss
                        </button>
                      </>
                    )}
                    {report.status === 'Investigating' && (
                      <>
                        <button
                          onClick={() => {
                            // Take action
                            alert('Action taken on reported entity');
                          }}
                          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Take Action
                        </button>
                        <button
                          onClick={() => {
                            // Close investigation
                            alert('Investigation closed - no action needed');
                          }}
                          className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Close Case
                        </button>
                      </>
                    )}
                    {report.status !== 'Pending' && report.status !== 'Investigating' && (
                      <button
                        onClick={() => {
                          // View details
                          alert(`Report Details:\n\n${report.description}\n\nStatus: ${report.status}\n\nReported: ${new Date(report.createdAt).toLocaleString()}`);
                        }}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                      >
                        View Details
                      </button>
                    )}
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
          <h2 className="heading-md text-gradient mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => {
                const users = JSON.parse(localStorage.getItem("users") || "[]");
                alert(`Total registered users: ${users.length}\n\n${users.map(u => `${u.name} (${u.role}) - ${u.email}`).join('\n')}`);
              }}
              className="glass card-modern rounded-xl p-6 hover:border-blue-400/30 group"
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="font-accent font-semibold text-white">Manage Users</span>
                <span className="font-primary text-xs text-gray-400 mt-1">View all users</span>
              </div>
            </button>

            <button
              onClick={() => {
                const newInstitution = {
                  id: Date.now(),
                  name: prompt("Enter institution name:"),
                  adminEmail: prompt("Enter admin email:"),
                  status: "Active",
                  vendors: 0,
                  students: 0
                };
                if (newInstitution.name && newInstitution.adminEmail) {
                  setInstitutions([...institutions, newInstitution]);
                  setStats(prev => ({ ...prev, totalInstitutions: prev.totalInstitutions + 1 }));
                  alert('Institution added successfully!');
                }
              }}
              className="glass card-modern rounded-xl p-6 hover:border-indigo-400/30 group"
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-accent font-semibold text-white">Add Institution</span>
                <span className="font-primary text-xs text-gray-400 mt-1">New university</span>
              </div>
            </button>

            <button
              onClick={() => {
                const newService = {
                  id: Date.now(),
                  name: "New Admin Service",
                  description: "Service added by admin",
                  price: "KES 2,500",
                  vendorName: "Admin Services",
                  rating: 5.0,
                  institution: "University of Nairobi",
                  approved: true,
                  paymentMethods: [
                    {
                      type: "mpesa",
                      method: "paybill",
                      businessNumber: "123456",
                      accountNumber: "ADMIN001",
                      instructions: "Pay via M-Pesa Paybill 123456, Account: ADMIN001"
                    }
                  ]
                };
                const services = JSON.parse(localStorage.getItem("services") || "[]");
                services.push(newService);
                localStorage.setItem("services", JSON.stringify(services));
                alert('New service added successfully!');
                window.location.reload();
              }}
              className="glass card-modern rounded-xl p-6 hover:border-green-400/30 group"
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-accent font-semibold text-white">Add Service</span>
                <span className="font-primary text-xs text-gray-400 mt-1">Create new service</span>
              </div>
            </button>

            <button
              onClick={() => {
                const settings = {
                  maintenance: false,
                  notifications: true,
                  maxBookings: 10,
                  currency: "KES",
                  mpesaEnabled: true,
                  lastUpdated: new Date().toISOString()
                };
                localStorage.setItem("systemSettings", JSON.stringify(settings));
                alert('System settings updated!\n\nCurrency: KES\nM-Pesa: Enabled\nMaintenance: Off\nNotifications: On\nMax Bookings: 10');
              }}
              className="glass card-modern rounded-xl p-6 hover:border-purple-400/30 group"
            >
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-accent font-semibold text-white">System Settings</span>
                <span className="font-primary text-xs text-gray-400 mt-1">Configure platform</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
