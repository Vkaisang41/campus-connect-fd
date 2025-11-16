import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Mock data
  useEffect(() => {
    setStories([
      {
        id: 1,
        user: { name: 'Alice Johnson', avatar: 'A', isOnline: true },
        stories: [
          {
            id: 1,
            type: 'text',
            content: 'Just aced my math exam! 📚🎉',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            timestamp: new Date(Date.now() - 1000 * 60 * 30)
          },
          {
            id: 2,
            type: 'image',
            content: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=500&fit=crop',
            timestamp: new Date(Date.now() - 1000 * 60 * 25)
          }
        ]
      },
      {
        id: 2,
        user: { name: 'Campus Laundry', avatar: 'L', isOnline: false },
        stories: [
          {
            id: 3,
            type: 'text',
            content: '⚡ Flash Sale: 30% off all services today only!',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
          }
        ]
      },
      {
        id: 3,
        user: { name: 'Bob Smith', avatar: 'B', isOnline: true },
        stories: [
          {
            id: 4,
            type: 'text',
            content: 'Study session at the library 📖 Coffee and coding!',
            background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
          },
          {
            id: 5,
            type: 'image',
            content: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=500&fit=crop',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
          }
        ]
      },
      {
        id: 4,
        user: { name: 'QuickPrint Services', avatar: 'Q', isOnline: false },
        stories: [
          {
            id: 6,
            type: 'text',
            content: '🖨️ New 24/7 service now available! Never miss a deadline again.',
            background: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
          }
        ]
      }
    ]);
  }, []);

  // Auto-progress through stories
  useEffect(() => {
    if (!selectedStory) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story or close
          if (currentStoryIndex < selectedStory.stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            setSelectedStory(null);
            setCurrentStoryIndex(0);
            return 0;
          }
        }
        return prev + 2; // Progress 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(timer);
  }, [selectedStory, currentStoryIndex]);

  const openStory = (storyUser) => {
    setSelectedStory(storyUser);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const nextStory = () => {
    if (currentStoryIndex < selectedStory.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return '1d+';
  };

  return (
    <>
      {/* Stories Bar */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {stories.map((storyUser) => (
            <motion.div
              key={storyUser.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openStory(storyUser)}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-lime-400 via-blue-500 to-purple-500 rounded-full p-0.5">
                  <div className="w-full h-full bg-[#0f0f0f] rounded-full flex items-center justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {storyUser.user.avatar}
                    </div>
                  </div>
                </div>
                {storyUser.user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
                )}
              </div>
              <p className="text-xs text-gray-400 text-center mt-1 truncate w-16">
                {storyUser.user.name.split(' ')[0]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={closeStory}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-sm w-full h-[600px] bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
                {selectedStory.stories.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: index < currentStoryIndex ? '100%' : index === currentStoryIndex ? '0%' : '0%' }}
                      animate={{
                        width: index < currentStoryIndex ? '100%' : index === currentStoryIndex ? `${progress}%` : '0%'
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                ))}
              </div>

              {/* Header */}
              <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedStory.user.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{selectedStory.user.name}</p>
                    <p className="text-gray-300 text-xs">
                      {formatTime(selectedStory.stories[currentStoryIndex].timestamp)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeStory}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Story Content */}
              <div className="w-full h-full flex items-center justify-center">
                {selectedStory.stories[currentStoryIndex].type === 'text' ? (
                  <div
                    className="w-full h-full flex items-center justify-center p-8 text-center"
                    style={{ background: selectedStory.stories[currentStoryIndex].background }}
                  >
                    <p className="text-white text-xl font-bold max-w-xs">
                      {selectedStory.stories[currentStoryIndex].content}
                    </p>
                  </div>
                ) : (
                  <img
                    src={selectedStory.stories[currentStoryIndex].content}
                    alt="Story"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Navigation Areas */}
              <div className="absolute inset-y-0 left-0 w-1/2 cursor-pointer" onClick={prevStory}></div>
              <div className="absolute inset-y-0 right-0 w-1/2 cursor-pointer" onClick={nextStory}></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}