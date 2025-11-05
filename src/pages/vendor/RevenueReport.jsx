import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RevenueReport() {
  const [timeRange, setTimeRange] = useState('month');
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    averageRating: 0,
    topService: '',
    monthlyData: []
  });

  useEffect(() => {
    // Mock analytics data
    setAnalytics({
      totalRevenue: 45250,
      totalBookings: 127,
      averageRating: 4.8,
      topService: 'Laundry Service',
      monthlyData: [
        { month: 'Jan', revenue: 8500, bookings: 23 },
        { month: 'Feb', revenue: 9200, bookings: 28 },
        { month: 'Mar', revenue: 11800, bookings: 32 },
        { month: 'Apr', revenue: 15750, bookings: 44 }
      ]
    });
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/vendor/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Revenue Analytics</h1>
          <p className="text-gray-400 text-lg mt-2">
            Track your performance and revenue insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="flex gap-2">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  timeRange === range
                    ? 'bg-lime-600 text-black'
                    : 'bg-[#111] border border-[#262626] text-white hover:border-lime-400'
                } transition-colors`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#111] border border-[#262626] rounded-xl p-6">
            <div className="text-2xl font-bold text-lime-400 mb-2">
              KES {analytics.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded-xl p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              {analytics.totalBookings}
            </div>
            <div className="text-sm text-gray-400">Total Bookings</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded-xl p-6">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {analytics.averageRating}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="bg-[#111] border border-[#262626] rounded-xl p-6">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {analytics.topService}
            </div>
            <div className="text-sm text-gray-400">Top Service</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-[#111] border border-[#262626] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <div className="space-y-4">
              {analytics.monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-lime-400 h-2 rounded-full"
                        style={{
                          width: `${(data.revenue / Math.max(...analytics.monthlyData.map(d => d.revenue))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-lime-400">
                    KES {data.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings Chart */}
          <div className="bg-[#111] border border-[#262626] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Bookings Trend</h3>
            <div className="space-y-4">
              {analytics.monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full"
                        style={{
                          width: `${(data.bookings / Math.max(...analytics.monthlyData.map(d => d.bookings))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-400">
                    {data.bookings} bookings
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="bg-[#111] border border-[#262626] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0a0a0a]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2025-01-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Laundry Service</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-lime-400">KES 250</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2025-01-14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Printing Service</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-lime-400">KES 150</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2025-01-13</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Tutoring</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Bob Johnson</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-lime-400">KES 500</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}