// app/components/Navbar.js
'use client';

import { Shield, Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Don't show this navbar on dashboard pages
  if (pathname.startsWith('/dashboard') || 
      (pathname.startsWith('/analyzer') && user)) {
    return null;
  }


  const navItems = [
    { label: 'Analyzer Hub', href: '/analyzer' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'API', href: '/api' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center">
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-6 h-6">
                    {/* Shield outline */}
                    <div className="absolute inset-0 border-2 border-white rounded-lg"></div>
                    {/* Top shield point */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-3 border-l-transparent border-r-transparent border-b-white"></div>
                    {/* Eye */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        {/* Eye outline */}
                        <div className="w-4 h-3 bg-white rounded-full"></div>
                        {/* Pupil */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-600 rounded-full"></div>
                        {/* Pupil dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <div className="flex items-baseline">
                  <span className="text-2xl font-black text-gray-900 tracking-tight">Hawkshield</span>
                  <span className="text-orange-600 font-black text-2xl tracking-tighter ml-2">AI</span>
                </div>
                <div className="text-[10px] text-gray-600 tracking-[0.15em] font-semibold uppercase mt-0.5">SEE THE TRUTH</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - ORANGE THEME */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-gray-700 hover:text-orange-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signin"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Zap className="h-4 w-4 inline mr-2" />
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-orange-600"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu - ORANGE THEME */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-orange-600 font-medium border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Link
                href="/signin"
                className="block py-3 text-gray-700 hover:text-orange-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signin"
                className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-center rounded-lg font-medium hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}