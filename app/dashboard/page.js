// app/dashboard/page.js
'use client';

import { BarChart3, TrendingUp, Users, FileVideo, Shield, Clock, Filter, Download, Zap, Eye } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');
  
  const stats = [
    { label: 'Total Scans', value: '2,847', change: '+12%', icon: BarChart3, color: 'orange' },
    { label: 'Deepfakes Detected', value: '143', change: '+8%', icon: Shield, color: 'black' },
    { label: 'Avg. Confidence', value: '98.7%', change: '+0.3%', icon: TrendingUp, color: 'orange' },
    { label: 'Active Users', value: '428', change: '+24%', icon: Users, color: 'black' },
  ];

  const recentScans = [
    { id: 1, name: 'news_interview.mp4', type: 'video', status: 'DEEPFAKE', confidence: 96, time: '2 min ago' },
    { id: 2, name: 'profile_photo.jpg', type: 'image', status: 'AUTHENTIC', confidence: 99, time: '5 min ago' },
    { id: 3, name: 'voice_message.wav', type: 'audio', status: 'SYNTHETIC', confidence: 88, time: '12 min ago' },
    { id: 4, name: 'corporate_video.mp4', type: 'video', status: 'AUTHENTIC', confidence: 97, time: '25 min ago' },
    { id: 5, name: 'social_media_clip.mov', type: 'video', status: 'MANIPULATED', confidence: 91, time: '1 hour ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header - FIXED: Removed extra padding/margin */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, Ayaan!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your account today.</p>
      </div>
      {/* Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-2">
          {['1d', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${
                  stat.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    stat.color === 'orange' ? 'text-orange-600' : 'text-gray-700'
                  }`} />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Analysis</h2>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded ${
                      scan.type === 'video' ? 'bg-orange-100' :
                      scan.type === 'audio' ? 'bg-gray-100' : 'bg-orange-50'
                    }`}>
                      <FileVideo className={`h-4 w-4 ${
                        scan.type === 'video' ? 'text-orange-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{scan.name}</div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="capitalize">{scan.type}</span>
                        <span>•</span>
                        <span>{scan.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      scan.status === 'AUTHENTIC' ? 'bg-green-100 text-green-800' :
                      scan.status === 'SYNTHETIC' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-red-800'
                    }`}>
                      {scan.status}
                    </span>
                    <div className="text-xs text-gray-500">
                      {scan.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-xl p-5 text-white">
            <h2 className="text-lg font-bold mb-2">System Status</h2>
            <p className="text-orange-100 text-sm mb-4">All systems operational</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>API Uptime</span>
                <span className="font-bold">99.99%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Queue Length</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Avg. Response</span>
                <span className="font-bold text-green-300">48ms</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Real-time Scans</span>
                <span className="font-bold">142/min</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                <div className="font-medium text-gray-900">New Scan</div>
                <div className="text-sm text-gray-500">Analyze media files</div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="font-medium text-gray-900">Generate Report</div>
                <div className="text-sm text-gray-500">Export analytics data</div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">API Keys</div>
                <div className="text-sm text-gray-500">Manage access tokens</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}