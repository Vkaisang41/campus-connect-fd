import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FriendSystem({ userId }) {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API calls
    setFriends([
      { id: 1, name: 'Alice Johnson', avatar: 'A', status: 'online', mutualFriends: 5 },
      { id: 2, name: 'Bob Smith', avatar: 'B', status: 'offline', mutualFriends: 3 },
      { id: 3, name: 'Carol Davis', avatar: 'C', status: 'online', mutualFriends: 8 },
    ]);

    setPendingRequests([
      { id: 4, name: 'David Wilson', avatar: 'D', mutualFriends: 2 },
      { id: 5, name: 'Eva Brown', avatar: 'E', mutualFriends: 1 },
    ]);

    setSuggestedFriends([
      { id: 6, name: 'Frank Miller', avatar: 'F', mutualFriends: 4, course: 'Computer Science' },
      { id: 7, name: 'Grace Lee', avatar: 'G', mutualFriends: 6, course: 'Engineering' },
      { id: 8, name: 'Henry Taylor', avatar: 'H', mutualFriends: 3, course: 'Business' },
    ]);
  }, []);

  const handleSendRequest = (friendId) => {
    // In real app, make API call
    setSuggestedFriends(prev => prev.filter(f => f.id !== friendId));
    setPendingRequests(prev => [...prev, suggestedFriends.find(f => f.id === friendId)]);
  };

  const handleAcceptRequest = (friendId) => {
    const acceptedFriend = pendingRequests.find(f => f.id === friendId);
    setPendingRequests(prev => prev.filter(f => f.id !== friendId));
    setFriends(prev => [...prev, { ...acceptedFriend, status: 'online' }]);
  };

  const handleDeclineRequest = (friendId) => {
    setPendingRequests(prev => prev.filter(f => f.id !== friendId));
  };

  const handleRemoveFriend = (friendId) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FriendCard = ({ friend, type = 'friend' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 hover:border-lime-400/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {friend.avatar}
            </div>
            {friend.status && (
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0f0f0f] ${
                friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
              }`} />
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold">{friend.name}</h3>
            {friend.course && (
              <p className="text-gray-400 text-sm">{friend.course}</p>
            )}
            {friend.mutualFriends && (
              <p className="text-gray-400 text-sm">{friend.mutualFriends} mutual friends</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          {type === 'suggested' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendRequest(friend.id)}
              className="px-4 py-2 bg-lime-400 text-black rounded-lg font-semibold hover:bg-lime-500 transition-colors text-sm"
            >
              Add Friend
            </motion.button>
          )}

          {type === 'pending' && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAcceptRequest(friend.id)}
                className="px-3 py-2 bg-lime-400 text-black rounded-lg font-semibold hover:bg-lime-500 transition-colors text-sm"
              >
                Accept
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeclineRequest(friend.id)}
                className="px-3 py-2 border border-gray-600 text-white rounded-lg hover:border-red-400 hover:text-red-400 transition-colors text-sm"
              >
                Decline
              </motion.button>
            </>
          )}

          {type === 'friend' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRemoveFriend(friend.id)}
              className="px-3 py-2 border border-gray-600 text-white rounded-lg hover:border-red-400 hover:text-red-400 transition-colors text-sm"
            >
              Remove
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
        <p className="text-gray-400">Connect with fellow students on campus</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-[#0f0f0f] p-1 rounded-lg">
        {[
          { id: 'friends', label: 'Friends', count: friends.length },
          { id: 'pending', label: 'Requests', count: pendingRequests.length },
          { id: 'suggested', label: 'Suggested', count: suggestedFriends.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-lime-400 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'friends' && (
          <motion.div
            key="friends"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {filteredFriends.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-white mb-2">No friends yet</h3>
                <p className="text-gray-400">Start connecting with fellow students!</p>
              </div>
            ) : (
              filteredFriends.map(friend => (
                <FriendCard key={friend.id} friend={friend} type="friend" />
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'pending' && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📨</div>
                <h3 className="text-xl font-semibold text-white mb-2">No pending requests</h3>
                <p className="text-gray-400">Friend requests will appear here</p>
              </div>
            ) : (
              pendingRequests.map(friend => (
                <FriendCard key={friend.id} friend={friend} type="pending" />
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'suggested' && (
          <motion.div
            key="suggested"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {suggestedFriends.map(friend => (
              <FriendCard key={friend.id} friend={friend} type="suggested" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}