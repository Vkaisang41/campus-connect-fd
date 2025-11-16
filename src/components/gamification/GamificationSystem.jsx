import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GamificationSystem({ userId }) {
  const [userStats, setUserStats] = useState({
    level: 5,
    xp: 1250,
    xpToNext: 1500,
    badges: [],
    achievements: [],
    streak: 7
  });

  const [showAchievement, setShowAchievement] = useState(null);

  // Mock data
  useEffect(() => {
    setUserStats({
      level: 5,
      xp: 1250,
      xpToNext: 1500,
      badges: [
        { id: 1, name: 'First Booking', icon: '🎯', description: 'Made your first service booking', unlocked: true },
        { id: 2, name: 'Review Master', icon: '⭐', description: 'Left 10 reviews', unlocked: true },
        { id: 3, name: 'Social Butterfly', icon: '🦋', description: 'Added 5 friends', unlocked: true },
        { id: 4, name: 'Early Bird', icon: '🐦', description: 'Book morning services 5 times', unlocked: false },
        { id: 5, name: 'Night Owl', icon: '🦉', description: 'Book evening services 5 times', unlocked: false }
      ],
      achievements: [
        { id: 1, name: 'Campus Explorer', description: 'Try 10 different services', progress: 7, total: 10, icon: '🗺️' },
        { id: 2, name: 'Loyal Customer', description: 'Book services for 30 consecutive days', progress: 7, total: 30, icon: '👑' },
        { id: 3, name: 'Community Builder', description: 'Help 20 fellow students', progress: 12, total: 20, icon: '🤝' }
      ],
      streak: 7
    });
  }, []);

  // Simulate XP gain
  const gainXP = (amount) => {
    setUserStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 300) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        // Show level up animation
        setShowAchievement({
          type: 'level',
          title: `Level ${newLevel}!`,
          description: 'Congratulations on leveling up!',
          icon: '⬆️'
        });
        setTimeout(() => setShowAchievement(null), 3000);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  };

  const xpProgress = (userStats.xp % 300) / 300 * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Your Progress</h1>
        <p className="text-gray-400">Level up by using campus services and engaging with the community</p>
      </div>

      {/* Level and XP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {userStats.level}
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Level {userStats.level}</h2>
              <p className="text-gray-400">{userStats.xp} XP • {userStats.xpToNext - userStats.xp} to next level</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lime-400 font-bold text-lg">{userStats.streak} day streak</div>
            <div className="text-gray-400 text-sm">Keep it up! 🔥</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <motion.div
            className="bg-gradient-to-r from-lime-400 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{userStats.xp % 300} XP</span>
          <span>300 XP</span>
        </div>
      </motion.div>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {userStats.achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{achievement.name}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-lime-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="text-right text-sm text-gray-400">
                {achievement.progress} / {achievement.total}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Badges</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {userStats.badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className={`relative bg-[#0f0f0f] border rounded-xl p-4 text-center transition-all duration-300 ${
                badge.unlocked
                  ? 'border-lime-400/50 shadow-lg shadow-lime-400/10'
                  : 'border-gray-700 opacity-50'
              }`}
            >
              <div className={`text-3xl mb-2 ${badge.unlocked ? '' : 'grayscale'}`}>
                {badge.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{badge.name}</h3>
              <p className="text-gray-400 text-xs">{badge.description}</p>

              {!badge.unlocked && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <div className="text-gray-500 text-xs">Locked</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Earn XP</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => gainXP(25)}
            className="bg-gradient-to-r from-lime-400 to-lime-500 text-black font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Book a Service (+25 XP)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => gainXP(15)}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Leave a Review (+15 XP)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => gainXP(10)}
            className="bg-gradient-to-r from-purple-400 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Add a Friend (+10 XP)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => gainXP(20)}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Share on Feed (+20 XP)
          </motion.button>
        </div>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-lime-400 to-blue-500 text-white p-6 rounded-xl shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{showAchievement.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{showAchievement.title}</h3>
                <p className="text-sm opacity-90">{showAchievement.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}