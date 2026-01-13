// app/analyzer/live/page.js
'use client';

import { useState, useEffect } from 'react';
import { Camera, Zap, Shield, Eye, Clock, AlertTriangle, CheckCircle, PauseCircle, PlayCircle, RotateCw } from 'lucide-react';

export default function LiveAnalyzerPage() {
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive && isAnalyzing) {
      interval = setInterval(() => {
        setFrameCount(prev => prev + 1);
        
        // Simulate analysis every 10 frames
        if (frameCount % 10 === 0) {
          const mockResult = {
            status: Math.random() > 0.7 ? 'SUSPICIOUS' : 'AUTHENTIC',
            confidence: Math.floor(Math.random() * 10) + 90,
            frame: frameCount,
            timestamp: new Date().toLocaleTimeString(),
            anomalies: Math.random() > 0.7 ? [
              'Minor facial inconsistency',
              'Lighting artifact detected'
            ] : []
          };
          setAnalysisResult(mockResult);
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isAnalyzing, frameCount]);

  const startAnalysis = () => {
    setIsActive(true);
    setIsAnalyzing(true);
    setFrameCount(0);
    setAnalysisResult(null);
  };

  const stopAnalysis = () => {
    setIsActive(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-orange-100 rounded-xl mr-4">
              <Camera className="h-7 w-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Live Camera Verification</h1>
              <p className="text-gray-600">Real-time deepfake detection during video calls and live streams</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">48ms</div>
              <div className="text-sm text-gray-600">Real-time Latency</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">30 fps</div>
              <div className="text-sm text-gray-600">Frame Analysis</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Browser-based</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Camera Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Camera Preview */}
              <div className="relative bg-black h-96">
                {isActive ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    {/* Camera Animation */}
                    <div className="relative mb-8">
                      <div className="w-48 h-48 rounded-full border-4 border-white/30 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full border-4 border-green-500 animate-pulse flex items-center justify-center">
                          <Camera className="h-16 w-16 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-32 rounded-full border-2 border-white/20"></div>
                      </div>
                    </div>
                    
                    <div className="text-white text-center">
                      <p className="text-xl mb-2">Live Camera Feed Active</p>
                      <p className="text-green-400">Analyzing {frameCount} frames...</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center mb-8">
                      <Camera className="h-16 w-16 text-white/50" />
                    </div>
                    <p className="text-xl mb-2">Camera Preview</p>
                    <p className="text-white/70">Click start to begin live verification</p>
                  </div>
                )}

                {/* Overlay Stats */}
                {isActive && (
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{frameCount}</div>
                        <div className="text-xs text-gray-300">Frames</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">30</div>
                        <div className="text-xs text-gray-300">FPS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">48ms</div>
                        <div className="text-xs text-gray-300">Latency</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    {isActive ? (
                      <button
                        onClick={stopAnalysis}
                        className="flex items-center px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                      >
                        <PauseCircle className="h-5 w-5 mr-2" />
                        Stop Verification
                      </button>
                    ) : (
                      <button
                        onClick={startAnalysis}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                      >
                        <PlayCircle className="h-5 w-5 mr-2" />
                        Start Live Verification
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        setFrameCount(0);
                        setAnalysisResult(null);
                      }}
                      className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <RotateCw className="h-5 w-5 mr-2" />
                      Reset
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Processing happens locally in your browser
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Results */}
            {analysisResult && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Analysis Results</h2>
                
                <div className={`p-6 rounded-xl mb-6 ${
                  analysisResult.status === 'AUTHENTIC' 
                    ? 'bg-orange-100 border border-green-200' 
                    : 'bg-yellow-100 border border-yellow-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {analysisResult.status === 'AUTHENTIC' ? (
                        <CheckCircle className="h-8 w-8 text-orange-600 mr-4" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-yellow-600 mr-4" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">
                          {analysisResult.status === 'AUTHENTIC' ? 'Live Feed Authentic' : 'Suspicious Activity Detected'}
                        </h3>
                        <p className="text-gray-700">
                          Confidence: {analysisResult.confidence}% • Frame: {analysisResult.frame}
                        </p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold">
                      {analysisResult.status === 'AUTHENTIC' ? '✅' : '⚠️'}
                    </div>
                  </div>
                </div>

                {analysisResult.anomalies.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-bold text-red-800 mb-2">Detected Anomalies:</h4>
                    <ul className="space-y-1">
                      {analysisResult.anomalies.map((anomaly, idx) => (
                        <li key={idx} className="flex items-center text-red-700">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          {anomaly}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Use Cases</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-gray-700">Video call authentication</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-gray-700">Live stream verification</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-gray-700">Remote job interviews</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-gray-700">Banking verification calls</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-red-600 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4">Privacy & Security</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3" />
                  <span>No data leaves your device</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-3" />
                  <span>Real-time local processing</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>48ms average latency</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Live Detection Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Facial Movement Analysis</span>
                    <span className="font-semibold">98.2% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-red-500 rounded-full w-9/10" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Real-time Consistency</span>
                    <span className="font-semibold">97.5% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-orange-500 rounded-full w-8/10" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Frame-to-frame Analysis</span>
                    <span className="font-semibold">99.1% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-yellow-500 rounded-full w-95/100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}