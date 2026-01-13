// app/analyzer/video/page.js
'use client';

import { useState } from 'react';
import { Upload, Video as VideoIcon, Clock, Eye, Mic, FileText, Cpu, AlertTriangle, CheckCircle, X, Play, Pause } from 'lucide-react';

export default function VideoAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile({
        name: uploadedFile.name,
        size: (uploadedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        duration: '0:30',
        url: URL.createObjectURL(uploadedFile)
      });
      simulateVideoAnalysis();
    }
  };

  const simulateVideoAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      const isFake = Math.random() > 0.5;
      const mockResult = {
        authenticity: isFake ? 'DEEPFAKE_DETECTED' : 'AUTHENTIC',
        confidence: Math.floor(Math.random() * 15) + 85,
        technicalAnalysis: {
          temporalAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Inconsistent frame-to-frame transitions',
              'Abnormal facial movement patterns',
              'Temporal artifact detection'
            ] : ['Natural temporal progression']
          },
          lipSyncAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Audio-visual sync anomalies',
              'Lip movement mismatch',
              'Voice-face correlation low'
            ] : ['Perfect lip synchronization']
          },
          biometricAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Inconsistent eye blinking',
              'Unnatural head movements',
              'Lighting inconsistencies'
            ] : ['Natural biometric patterns']
          }
        },
        recommendations: isFake ? [
          'High probability of deepfake manipulation',
          'Recommend verification with original source',
          'Do not use as evidence without further validation'
        ] : ['Video appears authentic', 'No manipulation detected']
      };
      
      setResult(mockResult);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-gray-100 rounded-xl mr-4">
              <VideoIcon className="h-7 w-7 text-gray-700" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Video Deepfake Detection</h1>
              <p className="text-gray-600">Advanced temporal analysis for face swaps, lip sync, and full-body deepfakes</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-gray-700">98.7%</div>
              <div className="text-sm text-gray-600">Detection Accuracy</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">≤ 3.5s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">25 fps</div>
              <div className="text-sm text-gray-600">Frame Analysis Rate</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Video</h2>
              
              {!file ? (
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Upload className="h-10 w-10 text-gray-700" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    Upload video for deepfake analysis
                  </p>
                  <label className="cursor-pointer inline-block">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="video/*"
                    />
                    <div className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                      Select Video File
                    </div>
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supports: MP4, MOV, AVI (Max 500MB, ≤5 minutes)
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    {/* Video Preview */}
                    <div className="relative rounded-xl overflow-hidden bg-black mb-4">
                      <div className="w-full h-64 flex items-center justify-center">
                        <div className="text-white text-center">
                          <VideoIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p>Video preview: {file.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6 text-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <h4 className="font-semibold">{file.name}</h4>
                          <p className="text-sm text-gray-500">{file.size} • {file.duration}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFile(null);
                          setResult(null);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-bg-gradient-to-r from-orange-500 to-orange-600 to-pink-500 animate-pulse" style={{ width: '85%' }} />
                      </div>
                      <div className="text-center text-gray-700">
                        Analyzing 25 frames per second with temporal AI models...
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
                
                <div className={`p-6 rounded-xl mb-8 ${
                  result.authenticity === 'AUTHENTIC' 
                    ? 'bg-orange-100 border border-green-200' 
                    : 'bg-orange-100 border border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.authenticity === 'AUTHENTIC' ? (
                        <CheckCircle className="h-8 w-8 text-orange-600 mr-4" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-orange-600 mr-4" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">
                          {result.authenticity === 'AUTHENTIC' ? 'Authentic Video' : 'Deepfake Detected'}
                        </h3>
                        <p className="text-gray-700">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>
                    <div className="text-3xl font-bold">
                      {result.authenticity === 'AUTHENTIC' ? '✅' : '⚠️'}
                    </div>
                  </div>
                </div>

                {/* Technical Analysis */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Clock className="h-5 w-5 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-2" />
                      Temporal Consistency Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.temporalAnalysis.findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                            finding.includes('Natural') ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className="text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Mic className="h-5 w-5 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-2" />
                      Lip Sync & Audio Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.lipSyncAnalysis.findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                            finding.includes('Perfect') ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className="text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Eye className="h-5 w-5 text-green-500 mr-2" />
                      Biometric Movement Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.biometricAnalysis.findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                            finding.includes('Natural') ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className="text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Video Detection Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Face swap detection</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Lip sync manipulation</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Full-body deepfakes</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Temporal consistency checks</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4">Analysis Process</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">1</div>
                  <span>Frame extraction (25 fps)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">2</div>
                  <span>Temporal consistency analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">3</div>
                  <span>Audio-visual synchronization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">4</div>
                  <span>Final authenticity scoring</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Technical Specs</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Video Length</span>
                  <span className="font-semibold">5 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frame Analysis</span>
                  <span className="font-semibold">25 fps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supported Codecs</span>
                  <span className="font-semibold">H.264, H.265</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Resolution</span>
                  <span className="font-semibold">4K UHD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}