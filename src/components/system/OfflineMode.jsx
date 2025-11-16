import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const [cachedData, setCachedData] = useState({});
  const [syncQueue, setSyncQueue] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineBanner(false);
      // Sync pending data when back online
      syncPendingData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
      // Load cached data
      loadCachedData();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection periodically
    const connectionCheck = setInterval(() => {
      if (navigator.onLine !== isOnline) {
        if (navigator.onLine) {
          handleOnline();
        } else {
          handleOffline();
        }
      }
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(connectionCheck);
    };
  }, [isOnline]);

  const loadCachedData = () => {
    // Load cached services, messages, etc.
    const cachedServices = localStorage.getItem('cached_services');
    const cachedMessages = localStorage.getItem('cached_messages');
    const cachedBookings = localStorage.getItem('cached_bookings');

    setCachedData({
      services: cachedServices ? JSON.parse(cachedServices) : [],
      messages: cachedMessages ? JSON.parse(cachedMessages) : [],
      bookings: cachedBookings ? JSON.parse(cachedBookings) : []
    });
  };

  const syncPendingData = () => {
    // Sync any pending actions when back online
    const pendingActions = JSON.parse(localStorage.getItem('pending_actions') || '[]');

    if (pendingActions.length > 0) {
      // In a real app, this would sync with the backend
      console.log('Syncing pending actions:', pendingActions);
      // Clear pending actions after sync
      localStorage.removeItem('pending_actions');
      setSyncQueue([]);
    }
  };

  const addToSyncQueue = (action) => {
    const newQueue = [...syncQueue, { ...action, timestamp: new Date() }];
    setSyncQueue(newQueue);
    localStorage.setItem('pending_actions', JSON.stringify(newQueue));
  };

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {showOfflineBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg"
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0 0L5.636 18.364m12.728-12.728L5.636 5.636m12.728 12.728L18.364 18.364" />
                </svg>
                <span className="font-medium">You're offline</span>
              </div>
              <div className="text-sm opacity-90">
                Some features may be limited
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Online Status Indicator */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
          title={isOnline ? 'Online' : 'Offline'}
        />
      </div>

      {/* Sync Status */}
      {syncQueue.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-20 right-6 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm">Syncing {syncQueue.length} items...</span>
          </div>
        </motion.div>
      )}

      {/* Offline Features Panel */}
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40 bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 shadow-2xl max-w-sm"
        >
          <h3 className="text-white font-semibold mb-3">Offline Mode</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Browse cached services</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Read saved messages</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">⏳</span>
              <span>Booking requests queued</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>Real-time features disabled</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Data will sync when connection is restored
          </div>
        </motion.div>
      )}

      {/* Cached Data Summary */}
      {!isOnline && Object.keys(cachedData).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-20 right-6 z-40 bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 shadow-2xl"
        >
          <h4 className="text-white font-medium mb-2">Cached Data</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>Services: {cachedData.services?.length || 0}</div>
            <div>Messages: {cachedData.messages?.length || 0}</div>
            <div>Bookings: {cachedData.bookings?.length || 0}</div>
          </div>
        </motion.div>
      )}
    </>
  );
}