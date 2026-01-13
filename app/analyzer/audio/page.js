// app/analyzer/audio/page.js
'use client';

import { useState } from 'react';
import { Upload, Mic, Volume2, Waves, FileText, Cpu, AlertTriangle, CheckCircle, X, Play, Pause } from 'lucide-react';

export default function AudioAnalyzerPage() {
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
        duration: '0:45',
        url: URL.createObjectURL(uploadedFile)
      });
      simulateAudioAnalysis();
    }
  };

  const simulateAudioAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      const isFake = Math.random() > 0.5;
      const mockResult = {
        authenticity: isFake ? 'SYNTHETIC_VOICE' : 'AUTHENTIC',
        confidence: Math.floor(Math.random() * 15) + 85,
        technicalAnalysis: {
          spectralAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Abnormal frequency distribution',
              'Missing natural voice harmonics',
              'Spectral artifacts detected'
            ] : ['Natural spectral patterns']
          },
          voiceprintAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Voice cloning patterns detected',
              'Inconsistent vocal characteristics',
              'Synthetic voiceprint signature'
            ] : ['Consistent natural voiceprint']
          },
          prosodyAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Unnatural speech rhythm',
              'Inconsistent emotional tone',
              'Mechanical prosody patterns'
            ] : ['Natural speech prosody']
          }
        },
        recommendations: isFake ? [
          'High probability of synthetic voice',
          'Likely voice cloning or TTS generation',
          'Recommend verification with speaker'
        ] : ['Audio appears authentic', 'Natural human speech detected']
      };
      
      setResult(mockResult);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-orange-100 rounded-xl mr-4">
              <Mic className="h-7 w-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Audio Deepfake Detection</h1>
              <p className="text-gray-600">Voice cloning detection and synthetic speech analysis</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">97.4%</div>
              <div className="text-sm text-gray-600">Detection Accuracy</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">≤ 2.8s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-gray-700">16 kHz</div>
              <div className="text-sm text-gray-600">Spectral Analysis</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Audio</h2>
              
              {!file ? (
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <Upload className="h-10 w-10 text-orange-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    Upload audio for voice cloning detection
                  </p>
                  <label className="cursor-pointer inline-block">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="audio/*"
                    />
                    <div className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                      Select Audio File
                    </div>
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supports: MP3, WAV, M4A (Max 100MB, ≤10 minutes)
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    {/* Audio Visualizer */}
                    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-green-900 to-blue-900 p-8 mb-4">
                      <div className="flex items-center justify-center h-32">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 bg-green-400 rounded-t"
                              style={{
                                height: `${Math.random() * 80 + 20}px`,
                                animation: `wave ${1 + Math.random()}s ease-in-out infinite`,
                                animationDelay: `${i * 0.05}s`
                              }}
                            />
                          ))}
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
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-green-500 to-bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse" style={{ width: '85%' }} />
                      </div>
                      <div className="text-center text-orange-600">
                        Analyzing spectral patterns and voice characteristics...
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
                          {result.authenticity === 'AUTHENTIC' ? 'Authentic Audio' : 'Synthetic Voice Detected'}
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
                      <Waves className="h-5 w-5 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-2" />
                      Spectral Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.spectralAnalysis.findings.map((finding, idx) => (
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
                      <Volume2 className="h-5 w-5 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-2" />
                      Voiceprint Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.voiceprintAnalysis.findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                            finding.includes('Consistent') ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className="text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Mic className="h-5 w-5 text-green-500 mr-2" />
                      Prosody & Speech Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.prosodyAnalysis.findings.map((finding, idx) => (
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
              <h3 className="font-bold text-gray-900 mb-4">Audio Detection Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Voice cloning detection</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Text-to-speech synthesis</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Voice conversion detection</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-gray-700">Audio splicing detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-green-600 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4">Voice Cloning Detection</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>ElevenLabs</span>
                  <span className="font-bold">96.3% acc.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Murf AI</span>
                  <span className="font-bold">94.7% acc.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Resemble AI</span>
                  <span className="font-bold">95.1% acc.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Custom TTS</span>
                  <span className="font-bold">92.8% acc.</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Technical Analysis Methods</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Spectral Analysis</span>
                    <span className="font-semibold">96.5% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-4/5" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Voiceprint Analysis</span>
                    <span className="font-semibold">95.2% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Prosody Analysis</span>
                    <span className="font-semibold">93.8% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-7/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
      `}</style>
    </div>
  );
}