import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    serviceUsage: [],
    revenue: [],
    engagement: []
  });
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Mock analytics data
    setAnalytics({
      userGrowth: [
        { date: '2024-11-10', users: 120, newUsers: 15 },
        { date: '2024-11-11', users: 135, newUsers: 18 },
        { date: '2024-11-12', users: 152, newUsers: 22 },
        { date: '2024-11-13', users: 168, newUsers: 16 },
        { date: '2024-11-14', users: 185, newUsers: 20 },
        { date: '2024-11-15', users: 203, newUsers: 25 },
        { date: '2024-11-16', users: 228, newUsers: 30 }
      ],
      serviceUsage: [
        { service: 'Laundry', bookings: 45, revenue: 2250 },
        { service: 'Printing', bookings: 32, revenue: 1600 },
        { service: 'Tutoring', bookings: 28, revenue: 4200 },
        { service: 'Food Delivery', bookings: 21, revenue: 3150 },
        { service: 'IT Support', bookings: 15, revenue: 2250 }
      ],
      revenue: [
        { month: 'Aug', amount: 12500 },
        { month: 'Sep', amount: 15200 },
        { month: 'Oct', amount: 18700 },
        { month: 'Nov', amount: 22100 }
      ],
      engagement: {
        dailyActiveUsers: 89,
        averageSessionTime: '12m 34s',
        bounceRate: '23%',
        conversionRate: '4.2%'
      }
    });
  }, [timeRange]);

  const StatCard = ({ title, value, change, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 hover:border-lime-400/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Comprehensive platform insights and performance metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="KES 68,600"
          change={12.5}
          icon={<span className="text-green-400 text-xl">💰</span>}
          color="bg-green-500/20"
        />
        <StatCard
          title="Active Users"
          value="228"
          change={8.2}
          icon={<span className="text-blue-400 text-xl">👥</span>}
          color="bg-blue-500/20"
        />
        <StatCard
          title="Total Bookings"
          value="141"
          change={15.3}
          icon={<span className="text-purple-400 text-xl">📅</span>}
          color="bg-purple-500/20"
        />
        <StatCard
          title="Conversion Rate"
          value="4.2%"
          change={-2.1}
          icon={<span className="text-yellow-400 text-xl">📈</span>}
          color="bg-yellow-500/20"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">User Growth</h3>
          <div className="space-y-3">
            {analytics.userGrowth.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                  {new Date(data.date).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 text-sm">+{data.newUsers}</span>
                  <span className="text-white font-medium">{data.users}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service Usage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Top Services</h3>
          <div className="space-y-4">
            {analytics.serviceUsage.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-lime-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-lime-400 text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{service.service}</div>
                    <div className="text-gray-400 text-sm">{service.bookings} bookings</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lime-400 font-semibold">KES {service.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Revenue Trends</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {analytics.revenue.map((month, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-lime-400 mb-1">
                KES {month.amount.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">{month.month} 2024</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Engagement Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {analytics.engagement.dailyActiveUsers}
          </div>
          <div className="text-gray-400 text-sm">Daily Active Users</div>
        </div>
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            {analytics.engagement.averageSessionTime}
          </div>
          <div className="text-gray-400 text-sm">Avg Session Time</div>
        </div>
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-xl font-bold text-yellow-400 mb-2">
            {analytics.engagement.bounceRate}
          </div>
          <div className="text-gray-400 text-sm">Bounce Rate</div>
        </div>
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">
            {analytics.engagement.conversionRate}
          </div>
          <div className="text-gray-400 text-sm">Conversion Rate</div>
        </div>
      </motion.div>

      {/* Export Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Export Analytics</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-lime-600 hover:bg-lime-500 text-black rounded-lg font-semibold transition-colors">
            📊 Export to CSV
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors">
            📈 Export to PDF
          </button>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors">
            📧 Email Report
          </button>
        </div>
      </motion.div>
    </div>
  );
}