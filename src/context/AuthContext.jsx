import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("reports");
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const addReport = (report) => {
    const newReport = {
      id: Date.now(),
      ...report,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));

    // Add notification for admin
    addNotification({
      id: Date.now(),
      type: "report",
      title: "New Report Submitted",
      message: `${report.type === 'student_to_vendor' ? 'Student' : 'Vendor'} reported an issue`,
      recipient: "admin",
      read: false,
      createdAt: new Date().toISOString()
    });
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      createdAt: new Date().toISOString(),
    };
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read);
  };

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      setUser,
      updateProfile,
      bookings,
      addBooking,
      reports,
      addReport,
      notifications,
      addNotification,
      markNotificationAsRead,
      getUnreadNotifications
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
