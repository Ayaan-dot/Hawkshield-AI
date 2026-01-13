// app/api/page.js
import { Zap, Shield, Clock, Globe, Cpu, Key, Terminal, Download, CheckCircle } from 'lucide-react';

export default function ApiPage() {
  const endpoints = [
    {
      method: 'POST',
      path: '/v1/analyze',
      title: 'Real-time media analysis for deepfakes',
      latency: '≤ 1.2s average response',
      rateLimit: '1000 requests/day'
    },
    {
      method: 'GET',
      path: '/v1/results/{id}',
      title: 'Retrieve analysis results',
      latency: '≤ 48ms average response',
      rateLimit: 'Unlimited'
    },
    {
      method: 'POST',
      path: '/v1/batch',
      title: 'Batch analyze multiple files',
      latency: '≤ 5s average response',
      rateLimit: '100 requests/day'
    },
    {
      method: 'GET',
      path: '/v1/status',
      title: 'Check API status and usage',
      latency: '≤ 24ms average response',
      rateLimit: 'Unlimited'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Real-time Analysis',
      description: 'Sub-second response times with our optimized inference engine'
    },
    {
      icon: Shield,
      title: 'Enterprise reliability',
      description: 'Automatic failover and load balancing with 99.9% Uptime SLA'
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'Data centers in 12 regions for low-latency worldwide access'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              API DOCUMENTATION
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hawkshield AI API
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Integrate real-time deepfake detection into your applications with sub-second latency
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">≤ 48ms</div>
            <div className="text-gray-700 font-medium">Average latency</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-700 font-medium">Uptime SLA</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-gray-700 font-medium">Edge locations</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <div className="inline-flex p-3 bg-orange-100 rounded-lg mb-6">
                  <Icon className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All endpoints require authentication via API key
          </p>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <span className={`px-3 py-1 rounded text-sm font-semibold mr-4 ${
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {endpoint.latency}
                    </div>
                    <div className="text-sm text-gray-600">
                      Rate limit: {endpoint.rateLimit}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{endpoint.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-6">
                <Terminal className="h-4 w-4 mr-2" />
                QUICK START
              </div>
              <h2 className="text-3xl font-bold mb-6">Quick Start Example</h2>
              <p className="text-gray-400 mb-8">
                Integrate real-time deepfake detection with just a few lines of code
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Get results in under 48ms</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Supports images, videos, and audio</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>99.7% detection accuracy</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">JavaScript Example</div>
                <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                  <Download className="h-4 w-4 inline mr-1" />
                  Copy Code
                </button>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Real-time deepfake detection with Hawkshield AI
const response = await fetch('https://api.hawkshield.ai/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    media_url: 'https://example.com/video.mp4',
    analysis_type: 'video',
    real_time: true,  // Enable sub-second processing
    confidence_threshold: 0.95
  })
});

// Get results in under 48ms
const result = await response.json();
console.log(result);
// {
//   "id": "req_123",
//   "authenticity": "AUTHENTIC",
//   "confidence": 0.987,
//   "latency_ms": 48,
//   "timestamp": "2024-01-15T10:30:00Z"
// }`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center text-white">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            <Key className="h-4 w-4 mr-2" />
            GET STARTED
          </div>
          <h2 className="text-4xl font-bold mb-6">Get API Keys</h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Free tier includes 1,000 API calls per month with real-time processing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              <Key className="mr-3 h-6 w-6" />
              Get Free API Key
            </button>
            <button className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}