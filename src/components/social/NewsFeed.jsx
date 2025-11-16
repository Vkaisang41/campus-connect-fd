import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        author: { name: 'Alice Johnson', avatar: 'A', role: 'Student' },
        content: 'Just booked an amazing tutoring session! 📚 The platform makes it so easy to connect with great tutors.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        likes: 12,
        comments: 3,
        type: 'service',
        image: null,
        liked: false
      },
      {
        id: 2,
        author: { name: 'Campus Laundry Pro', avatar: 'L', role: 'Vendor' },
        content: '🚀 New promotion! Get 20% off on all laundry services this weekend. Use code LAUNDRY20',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 25,
        comments: 8,
        type: 'promotion',
        image: 'https://images.unsplash.com/photo-1545177624-5dd9ecbf0c8a?w=400&h=200&fit=crop',
        liked: true
      },
      {
        id: 3,
        author: { name: 'Bob Smith', avatar: 'B', role: 'Student' },
        content: 'Found the perfect printing service for my thesis! The quality is outstanding and delivery was super fast. ⭐⭐⭐⭐⭐',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        likes: 8,
        comments: 2,
        type: 'review',
        image: null,
        liked: false
      },
      {
        id: 4,
        author: { name: 'StudyGroup Central', avatar: 'S', role: 'Student' },
        content: '📢 Looking for study partners for CS301! Anyone interested in forming a group for the upcoming exams?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        likes: 15,
        comments: 12,
        type: 'study',
        image: null,
        liked: false
      },
      {
        id: 5,
        author: { name: 'QuickPrint Services', avatar: 'Q', role: 'Vendor' },
        content: 'We now offer 24/7 printing services! No more waiting for business hours. Your assignments are safe with us! 🖨️',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        likes: 18,
        comments: 5,
        type: 'announcement',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
        liked: false
      }
    ];

    setPosts(mockPosts);
  }, []);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId) => {
    // In a real app, this would open a comment modal or navigate to post detail
    console.log('Comment on post:', postId);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return b.timestamp - a.timestamp;
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return (b.likes + b.comments * 2) - (a.likes + a.comments * 2);
      default:
        return 0;
    }
  });

  const filteredPosts = sortedPosts.filter(post => {
    if (filterBy === 'all') return true;
    return post.type === filterBy;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'service': return 'bg-blue-500';
      case 'promotion': return 'bg-green-500';
      case 'review': return 'bg-yellow-500';
      case 'study': return 'bg-purple-500';
      case 'announcement': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Campus Feed</h1>
        <p className="text-gray-400">Stay updated with campus activities and services</p>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
          >
            <option value="latest">Latest First</option>
            <option value="popular">Most Liked</option>
            <option value="trending">Trending</option>
          </select>
        </div>

        <div className="flex-1">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
          >
            <option value="all">All Posts</option>
            <option value="service">Services</option>
            <option value="promotion">Promotions</option>
            <option value="review">Reviews</option>
            <option value="study">Study Groups</option>
            <option value="announcement">Announcements</option>
          </select>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{post.author.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">{post.author.role}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{formatTime(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(post.type)}`}>
                  {post.type}
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-gray-300 leading-relaxed">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-48 object-cover rounded-lg mt-4"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">{post.likes}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleComment(post.id)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm">{post.comments}</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-lime-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}