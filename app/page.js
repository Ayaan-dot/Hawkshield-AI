// app/page.js
import { Shield, Zap, Clock, Eye, Cpu, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const stats = [
    { label: 'Media Analyzed', value: '2.1M+', color: 'orange' },
    { label: 'Detection Accuracy', value: '99.7%', color: 'green' },
    { label: 'Avg. Response Time', value: '48ms', color: 'orange' },
    { label: 'Enterprise Clients', value: '500+', color: 'black' },
  ];

  const features = [
    {
      icon: Clock,
      title: 'Real-Time Analysis',
      description: 'Instant verification during video calls and live streams with sub-second latency.',
      color: 'orange'
    },
    {
      icon: Eye,
      title: 'Multi-Modal Detection',
      description: 'Specialized AI models for images, videos, and audio with cross-verification.',
      color: 'black'
    },
    {
      icon: Cpu,
      title: 'Enterprise-Grade AI',
      description: 'Proprietary neural networks trained on millions of real and synthetic samples.',
      color: 'orange'
    },
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption, SOC2 compliance, and zero data retention policy.',
      color: 'black'
    },
  ];

  const useCases = [
    'Social Media Platforms',
    'News Organizations',
    'Government Agencies',
    'Financial Institutions',
    'Legal Teams',
    'Corporate Security',
    'HR Departments',
    'Educational Institutions'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <div className="text-center">
            {/* Eye Shield Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                {/* Subtle glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-xl group-hover:opacity-70 transition-opacity"></div>

                {/* Main logo - Clean design */}
                <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-8 rounded-2xl shadow-2xl border-2 border-white/10">
                  <div className="relative w-28 h-28">
                    {/* Shield - Clean outline */}
                    <div className="absolute inset-0 border-3 border-white/90 rounded-xl"></div>

                    {/* Shield top - Minimal */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-b-5 border-l-transparent border-r-transparent border-b-white/90"></div>

                    {/* Eye - Center focus */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        {/* Eye outline - Clean oval */}
                        <div className="w-20 h-12 bg-white rounded-full shadow-inner">
                          {/* Eyelid effect */}
                          <div className="absolute -top-1 left-4 w-12 h-4 bg-gradient-to-b from-white/40 to-transparent rounded-t-full"></div>
                        </div>

                        {/* Pupil with depth */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            {/* Outer pupil ring */}
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-800 via-black to-black rounded-full flex items-center justify-center shadow-lg">
                              {/* Inner pupil */}
                              <div className="w-9 h-9 bg-black rounded-full relative overflow-hidden">
                                {/* Iris pattern */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-orange-700 to-black opacity-60"></div>

                                {/* Pupil */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border border-orange-900">
                                  {/* Highlight */}
                                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                                </div>
                              </div>
                            </div>

                            {/* Scan lines - Horizontal */}
                            <div className="absolute -inset-10 overflow-hidden">
                              {/* Horizontal scanning line */}
                              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent animate-scan-horizontal"></div>
                              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent animate-scan-horizontal-delay"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Real-time indicator dots */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>

                {/* Floating text */}
                
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">Verify Reality</span>
              <span className="block bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 bg-clip-text text-transparent">
                in Real-Time
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Enterprise-grade deepfake detection with sub-second latency.
              <span className="block text-orange-200 font-medium mt-2">
                Protecting digital trust when every millisecond counts.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/analyzer"
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <Zap className="mr-2 h-5 w-5" />
                Try Live Analyzer
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-gray-900 bg-white/95 border-2 border-white/30 rounded-lg hover:border-orange-400 transition-all duration-300 backdrop-blur-sm"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </div>

            {/* Real-time indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm pb-8">
              <div className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>System Active</span>
              </div>
              <div className="flex items-center text-orange-300">
                <Clock className="h-4 w-4 mr-2" />
                <span>48ms Average Response</span>
              </div>
              <div className="flex items-center text-blue-300">
                <Shield className="h-4 w-4 mr-2" />
                <span>99.7% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - FIXED: Added white background to container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  stat.color === 'orange' ? 'text-orange-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'blue' ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Hawkshield AI?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built for enterprises that need reliable, fast, and accurate deepfake detection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                feature.color === 'orange'
                  ? 'border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:border-orange-200'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}>
                <div className={`inline-flex p-3 rounded-lg mb-6 ${
                  feature.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-7 w-7 ${
                    feature.color === 'orange' ? 'text-orange-600' : 'text-gray-700'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted By Industry Leaders
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Protecting digital integrity across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-500 transition-colors group">
                <div className="flex items-center">
                  <div className="mr-3 p-1 bg-orange-500/20 rounded group-hover:bg-orange-500/30 transition-colors">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="font-medium group-hover:text-orange-300 transition-colors">{useCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Real-Time Protection?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start detecting deepfakes with sub-second latency. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analyzer"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors hover:scale-105 transform duration-300"
            >
              <Clock className="mr-3 h-6 w-6" />
              Start Free Analysis
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              View Enterprise Plans
            </Link>
          </div>
          <div className="mt-8 text-gray-400">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                No credit card required
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                1,000 free analyses
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                SOC2 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}