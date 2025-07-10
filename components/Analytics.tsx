'use client'

import React, { useState } from 'react'
import { TrendingUp, DollarSign, Clock, Users, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months')

  const revenueData = [
    { month: 'Jul', revenue: 3200, expenses: 800, profit: 2400 },
    { month: 'Aug', revenue: 4100, expenses: 1200, profit: 2900 },
    { month: 'Sep', revenue: 3800, expenses: 900, profit: 2900 },
    { month: 'Oct', revenue: 5200, expenses: 1500, profit: 3700 },
    { month: 'Nov', revenue: 4800, expenses: 1300, profit: 3500 },
    { month: 'Dec', revenue: 6200, expenses: 1800, profit: 4400 },
  ]

  const clientData = [
    { name: 'TechCorp', value: 45, color: '#3B82F6' },
    { name: 'StartupXYZ', value: 25, color: '#10B981' },
    { name: 'LocalBiz', value: 15, color: '#F59E0B' },
    { name: 'Others', value: 15, color: '#EF4444' },
  ]

  const projectTypeData = [
    { type: 'Web Development', count: 12, revenue: 18500 },
    { type: 'Mobile Apps', count: 8, revenue: 15200 },
    { type: 'UI/UX Design', count: 15, revenue: 12800 },
    { type: 'Branding', count: 6, revenue: 8400 },
    { type: 'Consulting', count: 4, revenue: 6200 },
  ]

  const hoursData = [
    { month: 'Jul', planned: 160, actual: 145 },
    { month: 'Aug', planned: 180, actual: 175 },
    { month: 'Sep', planned: 160, actual: 158 },
    { month: 'Oct', planned: 200, actual: 185 },
    { month: 'Nov', planned: 180, actual: 172 },
    { month: 'Dec', planned: 220, actual: 198 },
  ]

  const monthlyStats = {
    totalRevenue: 34300,
    totalProjects: 45,
    totalHours: 1033,
    activeClients: 12,
    avgProjectValue: 763,
    hourlyRate: 85,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">${monthlyStats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{monthlyStats.totalProjects}</p>
              <p className="text-sm text-blue-600 mt-1">+8 from last period</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours Worked</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{monthlyStats.totalHours}</p>
              <p className="text-sm text-purple-600 mt-1">94% efficiency</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Clients</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{monthlyStats.activeClients}</p>
              <p className="text-sm text-orange-600 mt-1">+3 new clients</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue and Profit Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue & Profit Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="profit" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue by Client</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {clientData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Project Types */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Project Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hours Tracking */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Hours: Planned vs Actual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hoursData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="planned" fill="#E5E7EB" />
            <Bar dataKey="actual" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Average Project Value</span>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">${monthlyStats.avgProjectValue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Hourly Rate</span>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">${monthlyStats.hourlyRate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Client Retention</span>
              <span className="text-lg font-semibold text-green-600">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Project Success Rate</span>
              <span className="text-lg font-semibold text-green-600">96%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Revenue Goal</span>
                <span>$8,000 / $10,000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>New Clients</span>
                <span>3 / 5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Project Completion</span>
                <span>7 / 8</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics