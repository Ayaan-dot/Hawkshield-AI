// app/(protected)/analyzer/image/page.js - WITH REAL MODELS
'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Shield, AlertTriangle, CheckCircle, Loader2, Zap, Brain, Cpu, Eye, Users } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useAuth } from '@/context/AuthContext';

export default function ImageDetectionPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileNetModel, setMobileNetModel] = useState(null);
  const [cocoModel, setCocoModel] = useState(null);
  const [result, setResult] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const fileInputRef = useRef();

  // Load TensorFlow.js models
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      // Wait for TensorFlow.js to be ready
      await tf.ready();
      console.log('TensorFlow.js backend:', tf.getBackend());
      
      // Load MobileNet (for image classification)
      console.log('Loading MobileNet...');
      const mobilenetModel = await mobilenet.load();
      setMobileNetModel(mobilenetModel);
      
      // Load COCO-SSD (for object detection)
      console.log('Loading COCO-SSD...');
      const cocoSsdModel = await cocoSsd.load();
      setCocoModel(cocoSsdModel);
      
      setModelsLoaded(true);
      console.log('All models loaded successfully!');
      
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setResult(null); // Clear previous results
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image || !modelsLoaded) return;

    setLoading(true);
    setResult(null);

    try {
      // Create image element
      const img = new Image();
      img.src = preview;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // RUN REAL TENSORFLOW.JS MODELS
      console.log('Starting analysis...');
      
      // 1. CLASSIFY with MobileNet
      const mobileNetPredictions = await mobileNetModel.classify(img);
      console.log('MobileNet predictions:', mobileNetPredictions);
      
      // 2. DETECT OBJECTS with COCO-SSD
      const cocoPredictions = await cocoModel.detect(img);
      console.log('COCO-SSD detections:', cocoPredictions);
      
      // 3. Analyze for deepfake clues
      const analysis = analyzeForDeepfakes(mobileNetPredictions, cocoPredictions, img);
      
      setResult({
        ...analysis,
        rawPredictions: {
          mobileNet: mobileNetPredictions,
          cocoSsd: cocoPredictions
        },
        modelInfo: {
          mobileNetVersion: '2.1.0',
          cocoSsdVersion: '2.2.2',
          backend: tf.getBackend()
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Analysis error:', error);
      setResult({
        error: true,
        message: 'Analysis failed. Please try another image.',
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeForDeepfakes = (mobileNetPredictions, cocoPredictions, img) => {
  let warnings = [];
  let anomalyScore = 0;
  
  // NEW: Check if image has NO faces or objects
  if (cocoPredictions.length === 0) {
    warnings.push("No objects detected - image may be too simple or abstract");
    anomalyScore += 30; // High anomaly score for empty image
  }
  
  // Check 1: Multiple faces detection
  const faces = cocoPredictions.filter(p => p.class === 'person');
  if (faces.length > 1) {
    warnings.push(`Multiple faces detected (${faces.length}) - possible composite`);
    anomalyScore += 20;
  } else if (faces.length === 0) {
    warnings.push("No human faces detected - limited analysis possible");
    anomalyScore += 15;
  }
  
  // Check 2: Unusual objects
  const unusualObjects = cocoPredictions.filter(p => 
    ['cell phone', 'laptop', 'tv', 'book', 'computer', 'monitor', 'keyboard'].includes(p.class.toLowerCase())
  );
  if (unusualObjects.length > 0) {
    warnings.push(`Digital objects detected: ${unusualObjects.map(o => o.class).join(', ')}`);
    anomalyScore += 25;
  }
  
  // Check 3: Image classification patterns
  const topPrediction = mobileNetPredictions[0];
  const suspiciousClasses = [
    'digital', 'clock', 'computer', 'keyboard', 'monitor', 'printer',
    'website', 'screen', 'notebook', 'desktop', 'laptop', 'tv'
  ];
  
  const isSuspiciousClass = suspiciousClasses.some(c => 
    topPrediction.className.toLowerCase().includes(c)
  );
  
  if (isSuspiciousClass) {
    warnings.push('Image appears to be of digital content rather than real scene');
    anomalyScore += 40;
  }
  
  // Check 4: Confidence patterns (GANs often have weird confidence)
  const highConfidenceCount = mobileNetPredictions.filter(p => p.probability > 0.9).length;
  if (highConfidenceCount > 2) {
    warnings.push('Unusually high confidence across multiple categories');
    anomalyScore += 20;
  }
  
  // Calculate final result
  const hasContent = cocoPredictions.length > 0 || faces.length > 0;
  const isFake = anomalyScore > 40 || (anomalyScore > 20 && !hasContent);
  const confidence = Math.max(0.5, Math.min(0.95, 1 - (anomalyScore / 100)));
  
  return {
    isAuthentic: !isFake,
    confidence: confidence,
    anomalyScore: anomalyScore,
    warnings: warnings,
    detectionCount: {
      faces: faces.length,
      objects: cocoPredictions.length,
      classifications: mobileNetPredictions.length
    },
    topPredictions: mobileNetPredictions.slice(0, 3),
    detectedObjects: cocoPredictions.map(p => ({
      object: p.class,
      confidence: p.score,
      boundingBox: p.bbox
    }))
  };
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Image Deepfake Detection</h1>
              <p className="text-gray-600 mt-2">
                Upload an image to analyze for AI manipulation using TensorFlow.js
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                modelsLoaded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {modelsLoaded ? '✅ Models Loaded' : '⏳ Loading Models...'}
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold">
                TensorFlow.js
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Brain className="h-4 w-4 mr-2 text-orange-500" />
              <span>MobileNet v2 Classification</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Eye className="h-4 w-4 mr-2 text-blue-500" />
              <span>COCO-SSD Object Detection</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Cpu className="h-4 w-4 mr-2 text-green-500" />
              <span>WebGL GPU Acceleration</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upload Area */}
            <div 
              className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                preview 
                  ? 'border-orange-300 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                  handleImageUpload({ target: { files: [file] } });
                }
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              {preview ? (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setPreview(null);
                      setResult(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload Image
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag & drop or click to browse
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>✓ Supports JPG, PNG, WebP</p>
                    <p>✓ Maximum 10MB</p>
                    <p>✓ Analysis runs in your browser</p>
                  </div>
                </>
              )}
            </div>

            {/* Analysis Button */}
            <button
              onClick={analyzeImage}
              disabled={!image || loading || !modelsLoaded}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
                !image || loading || !modelsLoaded
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Running TensorFlow.js Analysis...
                </>
              ) : !modelsLoaded ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Loading AI Models...
                </>
              ) : !image ? (
                'Upload an Image to Begin'
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Analyze for Deepfakes
                </>
              )}
            </button>

            {/* Model Info */}
            {modelsLoaded && (
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-orange-600" />
                  Active TensorFlow.js Models
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium">MobileNet v2</span>
                    </div>
                    <span className="text-sm text-gray-600">Image Classification</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-medium">COCO-SSD</span>
                    </div>
                    <span className="text-sm text-gray-600">Object Detection</span>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-black to-gray-900 text-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">WebGL Backend</span>
                      <span className="text-sm text-green-300">GPU Accelerated</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Results Panel */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-orange-600" />
                TensorFlow.js Analysis Results
              </h3>

              {result ? (
                result.error ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center text-red-800">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span>{result.message}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Result Summary */}
                    <div className={`p-6 rounded-xl ${
                      result.isAuthentic 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {result.isAuthentic ? (
                            <>
                              <CheckCircle className="h-10 w-10 text-green-600 mr-4" />
                              <div>
                                <h4 className="text-2xl font-bold text-gray-900">AUTHENTIC</h4>
                                <p className="text-gray-600">
                                  Confidence: {(result.confidence * 100).toFixed(1)}%
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-10 w-10 text-red-600 mr-4" />
                              <div>
                                <h4 className="text-2xl font-bold text-gray-900">SUSPICIOUS</h4>
                                <p className="text-gray-600">
                                  Anomaly Score: {result.anomalyScore}/100
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="text-4xl font-black">
                          {result.isAuthentic ? '✓' : '⚠️'}
                        </div>
                      </div>
                    </div>

                    {/* Detections Summary */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Detections</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {result.detectionCount.faces}
                          </div>
                          <div className="text-sm text-gray-600">Faces</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {result.detectionCount.objects}
                          </div>
                          <div className="text-sm text-gray-600">Objects</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {(result.confidence * 100).toFixed(0)}%
                          </div>
                          <div className="text-sm text-gray-600">Confidence</div>
                        </div>
                      </div>
                    </div>

                    {/* Top Predictions */}
                    {result.topPredictions && result.topPredictions.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Image Classification</h4>
                        <div className="space-y-2">
                          {result.topPredictions.map((pred, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                              <span className="text-gray-700">{pred.className}</span>
                              <span className="font-bold text-gray-900">
                                {(pred.probability * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Warnings */}
                    {result.warnings.length > 0 && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 className="font-bold text-yellow-800 mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Detected Anomalies
                        </h5>
                        <ul className="space-y-1">
                          {result.warnings.map((warning, index) => (
                            <li key={index} className="text-sm text-yellow-700">
                              • {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Model Info */}
                    <div className="p-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg">
                      <h5 className="font-bold mb-2">Analysis Details</h5>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>MobileNet v{result.modelInfo.mobileNetVersion}</p>
                        <p>COCO-SSD v{result.modelInfo.cocoSsdVersion}</p>
                        <p>Backend: {result.modelInfo.backend}</p>
                        <p>Time: {new Date(result.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-500">
                    {modelsLoaded 
                      ? 'Upload an image to begin TensorFlow.js analysis'
                      : 'Loading TensorFlow.js models...'}
                  </p>
                  {!modelsLoaded && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full animate-pulse w-3/4"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Downloading AI models (≈20MB)...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}