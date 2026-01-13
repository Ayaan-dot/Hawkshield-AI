// app/signin/page.js
'use client';

import { useState } from 'react';
import { Eye, EyeOff, Shield, Zap, Lock, Mail, ArrowRight, CheckCircle, Users, Building } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp) {
      // Sign Up
      const result = await signUp(formData);
      if (result.success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError(result.error || 'Sign up failed');
      }
    } else {
      // Sign In
      const result = await signIn(formData.email, formData.password);
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setError(result.error || 'Invalid credentials');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC2 compliant with end-to-end encryption',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Sub-second deepfake detection latency',
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Collaborate with your security team',
    },
    {
      icon: Building,
      title: 'API Access',
      description: 'Integrate with your existing systems',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-black text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full relative">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold">DeepScan AI</span>
            </Link>
            <div className="text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : 'New to DeepScan?'}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-orange-400 hover:text-orange-300 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h1>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Start detecting deepfakes in real-time' 
                  : 'Sign in to access your dashboard'
                }
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="••••••••"
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {isSignUp && (
                  <p className="mt-2 text-sm text-gray-500">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                {!isSignUp && (
                  <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-500">
                    Forgot password?
                  </Link>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300"
              >
                {isSignUp ? (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Create Account
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

              {!isSignUp && (
                <div className="text-center">
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {/* Add Google OAuth */}}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => {/* Add GitHub OAuth */}}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
                    >
                      GitHub
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                By signing {isSignUp ? 'up' : 'in'}, you agree to our{' '}
                <Link href="/terms" className="text-orange-600 hover:text-orange-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="lg:pl-12">
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4 mr-2" />
                Trusted by 500+ Enterprises
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Enterprise-Grade Deepfake Detection
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of security professionals using DeepScan AI to protect their organizations from synthetic media threats.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="inline-flex p-3 bg-orange-50 rounded-lg mb-4">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-black to-gray-900 rounded-2xl text-white">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Free Plan Includes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      1,000 free analyses per month
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      Real-time API access
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      Basic dashboard features
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      99.7% detection accuracy
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}