// app/analyzer/page.js
import { Image as ImageIcon, Video, Mic, Camera, ArrowRight, Shield, Zap, Cpu, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzerHubPage() {
  const analyzerTypes = [
    {
      title: 'Image Analysis',
      description: 'Real-time detection of AI-generated faces and photo manipulations',
      icon: ImageIcon,
      color: 'orange',
      features: ['Face biometrics', 'GAN artifacts', 'Metadata forensics'],
      href: '/analyzer/image',
      stat: '99.2% accuracy',
      latency: '≤ 1.2s'
    },
    {
      title: 'Video Analysis',
      description: 'Instant verification of face swaps and lip sync manipulations',
      icon: Video,
      color: 'black',
      features: ['Temporal analysis', 'Audio-visual sync', 'Frame consistency'],
      href: '/analyzer/video',
      stat: '98.7% accuracy',
      latency: '≤ 3.5s'
    },
    {
      title: 'Audio Analysis',
      description: 'Real-time voice cloning detection and synthetic speech analysis',
      icon: Mic,
      color: 'orange',
      features: ['Spectral analysis', 'Voiceprint matching', 'Prosody detection'],
      href: '/analyzer/audio',
      stat: '97.4% accuracy',
      latency: '≤ 2.8s'
    },
    {
      title: 'Live Verification',
      description: 'Sub-second deepfake detection during live video calls',
      icon: Camera,
      color: 'black',
      features: ['Real-time processing', 'Local analysis', 'No data upload'],
      href: '/analyzer/live',
      stat: '48ms latency',
      latency: 'Real-time'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-500 to-orange-600 rounded-xl mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Real-Time Analyzer Hub</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized deepfake detection engines with sub-second latency. 
              Choose your verification method.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">99.7%</div>
            <div className="text-gray-600">Overall Accuracy</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-black">2.1M+</div>
            <div className="text-gray-600">Media Analyzed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">12ms</div>
            <div className="text-gray-600">Avg. Processing</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-black">100%</div>
            <div className="text-gray-600">Privacy Guaranteed</div>
          </div>
        </div>
      </div>

      {/* Analyzer Types Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {analyzerTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Link 
                key={index}
                href={type.href}
                className={`group p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${
                  type.color === 'orange'
                    ? 'border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:border-orange-300'
                    : 'border-gray-200 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg mr-4 ${
                      type.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-7 w-7 ${
                        type.color === 'orange' ? 'text-orange-600' : 'text-gray-700'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  <ArrowRight className={`h-5 w-5 ${
                    type.color === 'orange' 
                      ? 'text-orange-500 group-hover:text-orange-600' 
                      : 'text-gray-400 group-hover:text-gray-600'
                  } group-hover:translate-x-1 transition-transform`} />
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {type.features.map((feature, idx) => (
                      <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        type.color === 'orange'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                      type.color === 'orange'
                        ? 'bg-orange-50 text-orange-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      <Shield className="h-4 w-4 mr-2" />
                      {type.stat}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{type.latency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span>Click to start real-time analysis</span>
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Powered by specialized AI
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Real-Time Detection Architecture
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-900 to-orange-700 rounded-full flex items-center justify-center">
                <Cpu className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Optimized Inference</h3>
              <p className="text-gray-400">
                Proprietary neural networks optimized for sub-second inference times
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Edge Processing</h3>
              <p className="text-gray-400">
                Local analysis when possible, cloud scaling when needed
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-800">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-900 to-orange-700 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Pipeline</h3>
              <p className="text-gray-400">
                End-to-end encrypted processing with zero data retention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}