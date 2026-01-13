// app/analyzer/image/page.js
'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, Eye, Layers, FileText, Cpu, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function ImageAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile({
        name: uploadedFile.name,
        size: (uploadedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: URL.createObjectURL(uploadedFile)
      });
      simulateImageAnalysis();
    }
  };

  const simulateImageAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      const isFake = Math.random() > 0.5;
      const mockResult = {
        authenticity: isFake ? 'AI_GENERATED' : 'AUTHENTIC',
        confidence: Math.floor(Math.random() * 15) + 85,
        technicalAnalysis: {
          faceBiometrics: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'Unnatural eye symmetry',
              'Perfected skin texture',
              'Hair strand inconsistencies'
            ] : ['Natural facial features detected']
          },
          ganArtifacts: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: isFake ? [
              'GAN fingerprint patterns detected',
              'Grid artifacts in background',
              'Color banding inconsistencies'
            ] : ['No GAN artifacts found']
          },
          metadataAnalysis: {
            score: Math.floor(Math.random() * 30) + 70,
            findings: ['EXIF data consistent', 'No editing software traces']
          }
        },
        recommendations: isFake ? [
          'Likely AI-generated content',
          'Recommend verifying with original source',
          'Use caution when sharing'
        ] : ['Content appears authentic', 'No manipulation detected']
      };
      
      setResult(mockResult);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-orange-100 rounded-xl mr-4">
              <ImageIcon className="h-7 w-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Image Deepfake Detection</h1>
              <p className="text-gray-600">AI-powered analysis of photos for AI generation and manipulation</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">99.2%</div>
              <div className="text-sm text-gray-600">Detection Accuracy</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-orange-600">≤ 1.2s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow border">
              <div className="text-2xl font-bold text-gray-700">10+</div>
              <div className="text-sm text-gray-600">Detection Methods</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Image</h2>
              
              {!file ? (
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <Upload className="h-10 w-10 text-orange-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    Drag & drop your image here
                  </p>
                  <label className="cursor-pointer inline-block">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*"
                    />
                    <div className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                      Select Image File
                    </div>
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supports: JPG, PNG, WEBP (Max 50MB)
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-4">
                        <img src={file.url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{file.name}</h4>
                        <p className="text-sm text-gray-500">{file.size}</p>
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

                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse" style={{ width: '85%' }} />
                      </div>
                      <div className="text-center text-orange-600">
                        Analyzing image with specialized neural networks...
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
                
                {/* Result Banner */}
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
                          {result.authenticity === 'AUTHENTIC' ? 'Authentic Image' : 'AI-Generated Detected'}
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
                      <Eye className="h-5 w-5 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-2" />
                      Face Biometrics Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.faceBiometrics.findings.map((finding, idx) => (
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
                      <Layers className="h-5 w-5 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-2" />
                      GAN Artifact Detection
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.ganArtifacts.findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                            finding.includes('No GAN') ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className="text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <FileText className="h-5 w-5 text-green-500 mr-2" />
                      Metadata & Forensic Analysis
                    </h4>
                    <div className="space-y-2">
                      {result.technicalAnalysis.metadataAnalysis.findings.map((finding, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="h-2 w-2 rounded-full mt-2 mr-3 bg-bg-gradient-to-r from-orange-500 to-orange-600" />
                          <span className="text-gray-700">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">What We Detect</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">AI-generated faces (DALL-E, Midjourney, etc.)</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Face swaps and edits</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Photo manipulation artifacts</span>
                </li>
                <li className="flex items-center">
                  <Cpu className="h-4 w-4 text-bg-gradient-to-r from-orange-500 to-orange-600 mr-3" />
                  <span className="text-gray-700">Deepfake profile pictures</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4">Try Sample Images</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  AI-generated profile photo
                </button>
                <button className="w-full text-left p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  Edited product image
                </button>
                <button className="w-full text-left p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  Authentic portrait for comparison
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Detection Methods</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Face Biometric Analysis</span>
                    <span className="font-semibold">98.5% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-4/5" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>GAN Artifact Detection</span>
                    <span className="font-semibold">97.2% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Metadata Forensics</span>
                    <span className="font-semibold">99.1% acc.</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full w-9/10" />
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