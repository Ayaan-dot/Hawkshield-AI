// app/dashboard/analyzer/live/page.js - REAL LIVE WEBCAM ANALYSIS
'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Video, Zap, Shield, AlertTriangle, CheckCircle, Loader2, Pause, Play, Users, Eye, Cpu, Activity, Radio } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default function LiveVerificationPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [mobileNetModel, setMobileNetModel] = useState(null);
  const [cocoModel, setCocoModel] = useState(null);
  const [frameCount, setFrameCount] = useState(0);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [streamError, setStreamError] = useState(null);
  
  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef();
  const animationRef = useRef();
  const analysisIntervalRef = useRef();

  // Load TensorFlow.js models
  useEffect(() => {
    loadModels();
    return () => {
      stopStreaming();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, []);

  const loadModels = async () => {
    try {
      await tf.ready();
      console.log('TensorFlow.js loaded for live analysis');
      
      // Load models in parallel
      const [mobilenetModel, cocoSsdModel] = await Promise.all([
        mobilenet.load(),
        cocoSsd.load()
      ]);
      
      setMobileNetModel(mobilenetModel);
      setCocoModel(cocoSsdModel);
      setModelsLoaded(true);
      console.log('Live analysis models loaded');
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const startStreaming = async () => {
    try {
      setStreamError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });
      
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsStreaming(true);
      
      // Start canvas drawing
      drawVideoToCanvas();
      
      // Start periodic analysis
      startPeriodicAnalysis();
      
    } catch (error) {
      console.error('Camera access error:', error);
      setStreamError('Camera access denied. Please allow camera permissions.');
      setIsStreaming(false);
    }
  };

  const stopStreaming = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }
    setIsStreaming(false);
    setIsAnalyzing(false);
  };

  const drawVideoToCanvas = () => {
    if (!isStreaming || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match video
    if (canvas.width !== video.videoWidth) {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
    }
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Continue animation
    animationRef.current = requestAnimationFrame(drawVideoToCanvas);
  };

  const startPeriodicAnalysis = () => {
    // Analyze every 2 seconds
    analysisIntervalRef.current = setInterval(() => {
      if (isStreaming && modelsLoaded) {
        analyzeCurrentFrame();
      }
    }, 2000);
  };

  const analyzeCurrentFrame = async () => {
    if (!isStreaming || !modelsLoaded || !videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Ensure canvas has the current frame
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Run TensorFlow.js analysis
      const [mobileNetPredictions, cocoPredictions] = await Promise.all([
        mobileNetModel.classify(canvas),
        cocoModel.detect(canvas)
      ]);
      
      // Analyze results
      const analysis = analyzeLiveFrame(mobileNetPredictions, cocoPredictions);
      
      // Update results
      const newResults = {
        ...analysis,
        frameCount: frameCount + 1,
        timestamp: new Date().toISOString(),
        predictions: {
          mobileNet: mobileNetPredictions.slice(0, 3),
          cocoSsd: cocoPredictions.slice(0, 5)
        }
      };
      
      setAnalysisResults(newResults);
      setFrameCount(prev => prev + 1);
      
      // Update history
      setDetectionHistory(prev => {
        const newHistory = [newResults, ...prev.slice(0, 9)];
        return newHistory;
      });
      
    } catch (error) {
      console.error('Frame analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeLiveFrame = (mobileNetPredictions, cocoPredictions) => {
    let warnings = [];
    let anomalyScore = 0;
    let confidenceScore = 0;
    
    // Face detection
    const faces = cocoPredictions.filter(p => p.class === 'person');
    const faceCount = faces.length;
    
    if (faceCount === 0) {
      warnings.push('No face detected');
      anomalyScore += 20;
    } else if (faceCount === 1) {
      confidenceScore += 30;
    } else {
      warnings.push(`Multiple faces detected: ${faceCount}`);
      anomalyScore += 15 * faceCount;
    }
    
    // Live stream specific checks
    const topPrediction = mobileNetPredictions[0];
    const liveStreamClasses = ['webcam', 'camera', 'video', 'selfie', 'person'];
    const isLikelyLive = liveStreamClasses.some(c => 
      topPrediction.className.toLowerCase().includes(c)
    );
    
    if (isLikelyLive) {
      confidenceScore += 40;
    } else {
      warnings.push(`Content appears to be: ${topPrediction.className}`);
      anomalyScore += 25;
    }
    
    // Screen/device detection
    const suspiciousObjects = cocoPredictions.filter(p => 
      ['cell phone', 'laptop', 'monitor', 'tv', 'computer'].includes(p.class.toLowerCase())
    );
    
    if (suspiciousObjects.length > 0) {
      warnings.push(`Screen/device detected: ${suspiciousObjects.map(o => o.class).join(', ')}`);
      anomalyScore += 30;
    }
    
    // Confidence pattern analysis
    const confidenceVariance = calculateConfidenceVariance(mobileNetPredictions);
    if (confidenceVariance > 0.3) {
      warnings.push('Unusual confidence patterns detected');
      anomalyScore += 15;
    }
    
    // Calculate final scores
    const totalScore = Math.max(0, Math.min(100, confidenceScore - anomalyScore));
    const isLive = totalScore > 50 && faceCount > 0;
    
    return {
      isLive,
      confidence: totalScore / 100,
      anomalyScore,
      faceCount,
      warnings: warnings.slice(0, 3),
      topPrediction: topPrediction.className,
      topConfidence: (topPrediction.probability * 100).toFixed(1),
      objectCount: cocoPredictions.length,
      isMultipleFaces: faceCount > 1,
      hasScreens: suspiciousObjects.length > 0
    };
  };

  const calculateConfidenceVariance = (predictions) => {
    if (predictions.length < 2) return 0;
    const confidences = predictions.map(p => p.probability);
    const mean = confidences.reduce((a, b) => a + b) / confidences.length;
    const variance = confidences.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / confidences.length;
    return variance;
  };

  const getVerificationStatus = () => {
    if (!analysisResults) return 'INITIALIZING';
    
    if (analysisResults.isLive && analysisResults.confidence > 0.7) {
      return 'LIVE_VERIFIED';
    } else if (analysisResults.isLive && analysisResults.confidence > 0.4) {
      return 'LIKELY_LIVE';
    } else {
      return 'SUSPICIOUS';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE_VERIFIED': return 'bg-green-100 text-green-800 border-green-300';
      case 'LIKELY_LIVE': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'SUSPICIOUS': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'LIVE_VERIFIED': return CheckCircle;
      case 'LIKELY_LIVE': return AlertTriangle;
      case 'SUSPICIOUS': return AlertTriangle;
      default: return Loader2;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Verification</h1>
              <p className="text-gray-600 mt-2">
                Real-time webcam analysis for live person verification
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(getVerificationStatus())}`}>
                {getVerificationStatus().replace('_', ' ')}
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold">
                TensorFlow.js
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center p-3 bg-white rounded-lg border shadow-sm">
              <Camera className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <div className="font-bold">Real-time Webcam</div>
                <div className="text-sm text-gray-600">Live stream analysis</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border shadow-sm">
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <div className="font-bold">Face Detection</div>
                <div className="text-sm text-gray-600">COCO-SSD AI</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border shadow-sm">
              <Cpu className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="font-bold">Image Classification</div>
                <div className="text-sm text-gray-600">MobileNet v2</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border shadow-sm">
              <Activity className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <div className="font-bold">Continuous Analysis</div>
                <div className="text-sm text-gray-600">Frame-by-frame</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Live Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Video Feed */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Video className="h-5 w-5 mr-2 text-orange-600" />
                  Live Camera Feed
                </h2>
              </div>
              
              <div className="p-6">
                {streamError ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                    <p className="text-red-600 font-medium">{streamError}</p>
                    <p className="text-gray-500 mt-2">Please allow camera access to continue.</p>
                  </div>
                ) : !isStreaming ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Start Live Verification
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Enable your camera for real-time AI analysis
                    </p>
                    <button
                      onClick={startStreaming}
                      disabled={!modelsLoaded}
                      className={`inline-flex items-center px-8 py-3 rounded-lg font-bold text-lg ${
                        modelsLoaded
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {modelsLoaded ? (
                        <>
                          <Camera className="h-5 w-5 mr-2" />
                          Start Camera
                        </>
                      ) : (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Loading AI Models...
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Video Feed */}
                    <div className="relative rounded-xl overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-auto"
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      />
                      
                      {/* Overlay Status */}
                      <div className="absolute top-4 left-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm ${
                          isAnalyzing 
                            ? 'bg-yellow-500/80 text-white' 
                            : 'bg-green-500/80 text-white'
                        }`}>
                          {isAnalyzing ? 'ANALYZING...' : 'LIVE'}
                        </div>
                      </div>
                      
                      {/* Frame Counter */}
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        Frame: {frameCount}
                      </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex justify-center mt-6 space-x-4">
                      <button
                        onClick={stopStreaming}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                      >
                        Stop Camera
                      </button>
                      <button
                        onClick={analyzeCurrentFrame}
                        disabled={isAnalyzing}
                        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50"
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Analysis Results */}
            {analysisResults && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-orange-600" />
                  Real-time Analysis
                </h2>
                
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className={`p-6 rounded-xl border-2 ${
                    analysisResults.isLive 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                      : 'bg-gradient-to-r from-orange-50 to-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {analysisResults.isLive ? (
                          <CheckCircle className="h-10 w-10 text-green-600 mr-4" />
                        ) : (
                          <AlertTriangle className="h-10 w-10 text-orange-600 mr-4" />
                        )}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {analysisResults.isLive ? 'LIVE PERSON DETECTED' : 'SUSPICIOUS CONTENT'}
                          </h3>
                          <p className="text-gray-700">
                            Confidence: {(analysisResults.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-4xl font-black">
                        {analysisResults.isLive ? '✓' : '⚠️'}
                      </div>
                    </div>
                  </div>

                  {/* Detection Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {analysisResults.faceCount}
                      </div>
                      <div className="text-sm text-gray-600">Faces</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {analysisResults.objectCount}
                      </div>
                      <div className="text-sm text-gray-600">Objects</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {analysisResults.topConfidence}%
                      </div>
                      <div className="text-sm text-gray-600">AI Confidence</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {frameCount}
                      </div>
                      <div className="text-sm text-gray-600">Frames Analyzed</div>
                    </div>
                  </div>

                  {/* AI Predictions */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">AI Classification</h4>
                    <div className="space-y-2">
                      {analysisResults.predictions.mobileNet.map((pred, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{pred.className}</span>
                          <span className="font-bold text-gray-900">
                            {(pred.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warnings */}
                  {analysisResults.warnings.length > 0 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-bold text-yellow-800 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        AI Detection Warnings
                      </h5>
                      <ul className="space-y-1">
                        {analysisResults.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-yellow-700">
                            • {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - History & Info */}
          <div className="space-y-6">
            {/* Analysis History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-orange-600" />
                Analysis History
              </h3>
              
              {detectionHistory.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {detectionHistory.map((detection, idx) => {
                    const StatusIcon = getStatusIcon(
                      detection.isLive && detection.confidence > 0.7 ? 'LIVE_VERIFIED' :
                      detection.isLive ? 'LIKELY_LIVE' : 'SUSPICIOUS'
                    );
                    
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          detection.isLive 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <StatusIcon className={`h-4 w-4 mr-2 ${
                              detection.isLive ? 'text-green-600' : 'text-red-600'
                            }`} />
                            <span className="font-medium">
                              {detection.faceCount} face{detection.faceCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(detection.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Confidence: {(detection.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No analysis history yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start camera to begin tracking</p>
                </div>
              )}
            </div>

            {/* AI Model Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Active AI Models</h3>
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
                    <span className="text-sm text-green-300">{tf.getBackend()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Verification Tips */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Verification Tips
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Ensure good lighting on your face</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Look directly at the camera</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Avoid holding screens/phones in frame</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Multiple faces will be flagged</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={isStreaming ? stopStreaming : startStreaming}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                    isStreaming
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                  }`}
                >
                  {isStreaming ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Stop Camera
                    </>
                  ) : (
                    <>
                      <Camera className="h-5 w-5 mr-2" />
                      Start Camera
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setDetectionHistory([])}
                  disabled={detectionHistory.length === 0}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}