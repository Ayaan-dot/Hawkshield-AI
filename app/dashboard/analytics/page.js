// app/dashboard/analytics/page.js
'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, LineChart, PieChart, TrendingUp, Users, Clock, 
  Download, Filter, Calendar, Target, Shield, Zap, Eye,
  ChevronUp, ChevronDown, Activity, DollarSign, Globe, Cpu
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchAnalytics = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock analytics data
      const mockData = {
        summary: {
          totalScans: 2847,
          deepfakesDetected: 143,
          avgConfidence: 98.7,
          activeUsers: 428,
          apiCalls: 12456,
          avgResponseTime: 48,
          successRate: 99.9,
          revenue: 24800
        },
        
        dailyMetrics: [
          { date: 'Jan 1', scans: 120, deepfakes: 8, users: 95 },
          { date: 'Jan 2', scans: 145, deepfakes: 12, users: 110 },
          { date: 'Jan 3', scans: 132, deepfakes: 9, users: 102 },
          { date: 'Jan 4', scans: 168, deepfakes: 15, users: 125 },
          { date: 'Jan 5', scans: 190, deepfakes: 18, users: 145 },
          { date: 'Jan 6', scans: 210, deepfakes: 21, users: 165 },
          { date: 'Jan 7', scans: 195, deepfakes: 17, users: 155 },
        ],
        
        detectionBreakdown: [
          { type: 'Image', count: 1564, percentage: 55, color: 'orange' },
          { type: 'Video', count: 895, percentage: 31, color: 'blue' },
          { type: 'Audio', count: 254, percentage: 9, color: 'green' },
          { type: 'Live', count: 134, percentage: 5, color: 'purple' },
        ],
        
        topDetections: [
          { name: 'profile_photo.jpg', type: 'Image', confidence: 99, status: 'AUTHENTIC', time: '2 min ago' },
          { name: 'news_interview.mp4', type: 'Video', confidence: 96, status: 'DEEPFAKE', time: '5 min ago' },
          { name: 'voice_message.wav', type: 'Audio', confidence: 88, status: 'SYNTHETIC', time: '12 min ago' },
          { name: 'corporate_video.mp4', type: 'Video', confidence: 97, status: 'AUTHENTIC', time: '25 min ago' },
          { name: 'selfie_photo.jpg', type: 'Image', confidence: 98, status: 'AUTHENTIC', time: '1 hour ago' },
        ],
        
        geographicalData: [
          { country: 'United States', scans: 845, growth: '+12%' },
          { country: 'United Kingdom', scans: 432, growth: '+8%' },
          { country: 'Germany', scans: 321, growth: '+15%' },
          { country: 'Canada', scans: 287, growth: '+5%' },
          { country: 'Australia', scans: 234, growth: '+18%' },
        ],
        
        systemMetrics: {
          uptime: 99.99,
          latency: 48,
          queue: 12,
          accuracy: 99.7,
          throughput: 142
        }
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    };
    
    fetchAnalytics();
  }, [timeRange]);

  const timeRanges = [
    { id: '1d', label: 'Today' },
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last quarter' },
  ];

  const summaryCards = [
    {
      icon: BarChart3,
      label: 'Total Scans',
      value: analyticsData?.summary.totalScans.toLocaleString(),
      change: '+12%',
      trend: 'up',
      color: 'orange'
    },
    {
      icon: Shield,
      label: 'Deepfakes Detected',
      value: analyticsData?.summary.deepfakesDetected.toLocaleString(),
      change: '+8%',
      trend: 'up',
      color: 'black'
    },
    {
      icon: TrendingUp,
      label: 'Avg. Confidence',
      value: `${analyticsData?.summary.avgConfidence}%`,
      change: '+0.3%',
      trend: 'up',
      color: 'green'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: analyticsData?.summary.activeUsers.toLocaleString(),
      change: '+24%',
      trend: 'up',
      color: 'blue'
    },
    {
      icon: Cpu,
      label: 'API Calls',
      value: analyticsData?.summary.apiCalls.toLocaleString(),
      change: '+18%',
      trend: 'up',
      color: 'purple'
    },
    {
      icon: Clock,
      label: 'Avg. Response',
      value: `${analyticsData?.summary.avgResponseTime}ms`,
      change: '-2ms',
      trend: 'down',
      color: 'green'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your deepfake detection platform</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range.id
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${
                  card.color === 'orange' ? 'bg-orange-100' : 
                  card.color === 'green' ? 'bg-green-100' :
                  card.color === 'blue' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    card.color === 'orange' ? 'text-orange-600' : 
                    card.color === 'green' ? 'text-green-600' :
                    card.color === 'blue' ? 'text-blue-600' : 'text-gray-700'
                  }`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {card.trend === 'up' ? (
                    <ChevronUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-1" />
                  )}
                  {card.change}
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">{card.value}</div>
              <div className="text-sm text-gray-600 mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts & Graphs */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scan Activity Chart */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-orange-600" />
              Scan Activity
            </h2>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Scans</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Deepfakes</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {analyticsData.dailyMetrics.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{day.date}</span>
                  <span className="text-gray-900 font-medium">{day.scans} scans</span>
                </div>
                <div className="flex h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-orange-500"
                    style={{ width: `${(day.scans / 250) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-red-500"
                    style={{ width: `${(day.deepfakes / 25) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{day.users} users</span>
                  <span>{day.deepfakes} deepfakes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detection Breakdown */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-600" />
              Detection Breakdown
            </h2>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.detectionBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      item.color === 'orange' ? 'bg-orange-500' :
                      item.color === 'blue' ? 'bg-blue-500' :
                      item.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{item.type}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      item.color === 'orange' ? 'bg-orange-500' :
                      item.color === 'blue' ? 'bg-blue-500' :
                      item.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {item.count.toLocaleString()} detections
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Detections */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Recent Detections
              </h2>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {analyticsData.topDetections.map((detection, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded ${
                      detection.type === 'Image' ? 'bg-orange-100' :
                      detection.type === 'Video' ? 'bg-blue-100' :
                      detection.type === 'Audio' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      <Eye className={`h-4 w-4 ${
                        detection.type === 'Image' ? 'text-orange-600' :
                        detection.type === 'Video' ? 'text-blue-600' :
                        detection.type === 'Audio' ? 'text-green-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{detection.name}</div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="capitalize">{detection.type}</span>
                        <span>•</span>
                        <span>{detection.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      detection.status === 'AUTHENTIC' ? 'bg-green-100 text-green-800' :
                      detection.status === 'SYNTHETIC' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {detection.status}
                    </span>
                    <div className="text-xs text-gray-500">
                      {detection.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status & Geography */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-xl p-5 text-white">
            <h2 className="text-lg font-bold mb-4">System Status</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Uptime</span>
                  <span className="font-bold">{analyticsData.systemMetrics.uptime}%</span>
                </div>
                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: '99.99%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Latency</span>
                  <span className="font-bold">{analyticsData.systemMetrics.latency}ms</span>
                </div>
                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-green-300" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Accuracy</span>
                  <span className="font-bold">{analyticsData.systemMetrics.accuracy}%</span>
                </div>
                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: '99.7%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Throughput</span>
                  <span className="font-bold">{analyticsData.systemMetrics.throughput}/min</span>
                </div>
                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Geographical Distribution */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              Top Countries
            </h2>
            
            <div className="space-y-3">
              {analyticsData.geographicalData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 mr-3">
                      {index + 1}
                    </div>
                    <span className="text-gray-900">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{country.scans.toLocaleString()}</div>
                    <div className={`text-xs ${
                      country.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {country.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.summary.successRate}%</div>
            <div className="text-xs text-green-600 mt-1">+0.1% from last week</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Avg. Processing</div>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.systemMetrics.latency}ms</div>
            <div className="text-xs text-green-600 mt-1">-2ms improvement</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Peak Load</div>
            <div className="text-2xl font-bold text-gray-900">2.4K</div>
            <div className="text-xs text-gray-600 mt-1">scans per hour</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="text-2xl font-bold text-gray-900">${analyticsData.summary.revenue.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+18% this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}