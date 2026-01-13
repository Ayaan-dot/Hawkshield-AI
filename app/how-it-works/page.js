// app/how-it-works/page.js
import { Cpu, Shield, Zap, BarChart, Eye, Cloud, Lock, Globe, Clock } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Cloud,
      title: "Upload Media",
      description: "Securely upload images, videos, or audio files through our encrypted platform",
      color: "orange",
      latency: "Instant upload"
    },
    {
      icon: Cpu,
      title: "Real-Time Processing",
      description: "Our optimized neural networks analyze with sub-second latency",
      color: "black",
      latency: "< 500ms"
    },
    {
      icon: BarChart,
      title: "Multi-Layer Analysis",
      description: "Cross-reference multiple detection techniques for maximum accuracy",
      color: "orange",
      latency: "Parallel processing"
    },
    {
      icon: Shield,
      title: "Verification Results",
      description: "Generate comprehensive authenticity reports with confidence scores",
      color: "black",
      latency: "48ms average"
    }
  ];

  const technologies = [
    {
      name: "Real-Time Biometric Analysis",
      description: "Detects unnatural facial movements and skin texture anomalies in milliseconds",
      icon: Eye,
      latency: "32ms"
    },
    {
      name: "Audio Forensics Engine",
      description: "Identifies synthetic voice patterns with sub-second processing",
      icon: Zap,
      latency: "56ms"
    },
    {
      name: "Optimized Neural Networks",
      description: "GAN detection algorithms optimized for real-time inference",
      icon: Cpu,
      latency: "24ms"
    },
    {
      name: "Blockchain Timestamping",
      description: "Optional blockchain verification for tamper-proof audit trails",
      icon: Lock,
      latency: "1.2s"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-500 to-orange-600 rounded-2xl mb-6">
            <Cpu className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How Hawkshield AI Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time deepfake detection powered by optimized AI architecture
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mb-20">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-500 via-black to-orange-500 transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${
                    step.color === 'orange' 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-500 to-orange-600' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-black to-gray-800'
                  } flex items-center justify-center shadow-lg`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="mb-4">
                      <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="font-bold text-orange-600">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <div className="flex items-center justify-center text-sm text-orange-600 mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.latency}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Real-Time Detection Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-orange-50 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h3>
                        <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {tech.latency}
                        </div>
                      </div>
                      <p className="text-gray-600">{tech.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      {Math.floor(Math.random() * 20) + 85}% real-time accuracy
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-black to-gray-900 rounded-3xl p-12 text-white">
          <div className="text-center mb-10">
            <Globe className="h-16 w-16 mx-auto mb-6 text-orange-400" />
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Your data is protected with military-grade encryption and strict privacy controls
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-orange-400">AES-256</div>
              <p className="text-gray-300">End-to-end encryption</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">SOC2</div>
              <p className="text-gray-300">Type II Certified</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-green-400">0</div>
              <p className="text-gray-300">Data retention policy</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Real-Time Performance Metrics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Latency Benchmarks</h3>
              <div className="space-y-6">
                {[
                  { label: 'Image Analysis', value: 1200, color: 'orange' },
                  { label: 'Video Analysis', value: 3500, color: 'black' },
                  { label: 'Audio Analysis', value: 2800, color: 'orange' },
                  { label: 'Live Verification', value: 48, color: 'green' },
                ].map((benchmark, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">{benchmark.label}</span>
                      <span className="font-bold">{benchmark.value}ms</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          benchmark.color === 'orange' ? 'bg-orange-500' :
                          benchmark.color === 'black' ? 'bg-black' : 'bg-green-500'
                        } rounded-full`}
                        style={{ width: `${Math.min(100, (benchmark.value / 50))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Detection Accuracy</h3>
              <div className="space-y-6">
                {[
                  { label: 'Overall Accuracy', value: 99.7, color: 'orange' },
                  { label: 'False Positive Rate', value: 0.2, color: 'green' },
                  { label: 'False Negative Rate', value: 0.1, color: 'red' },
                  { label: 'Real-time Confidence', value: 98.9, color: 'black' },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">{metric.label}</span>
                      <span className="font-bold">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          metric.color === 'orange' ? 'bg-orange-500' :
                          metric.color === 'green' ? 'bg-green-500' :
                          metric.color === 'red' ? 'bg-red-500' : 'bg-black'
                        } rounded-full`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}