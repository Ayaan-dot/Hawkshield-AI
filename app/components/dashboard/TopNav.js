// app/components/dashboard/TopNav.js
'use client';

import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';

export default function TopNav({ onMenuClick }) {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side with logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 mr-4 text-gray-500 hover:text-orange-600"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Logo - ORANGE THEME */}
            <Link href="/dashboard" className="hidden md:flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 border-2 border-white rounded-lg"></div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-lg font-black text-gray-900">Hawkshield</span>
                  <span className="text-orange-600 font-black text-lg ml-1">AI</span>
                </div>
                <div className="text-[10px] text-gray-600 tracking-[0.15em] font-semibold uppercase">
                  DASHBOARD
                </div>
              </div>
            </Link>
            
            {/* Search */}
            <div className="relative w-64 ml-4 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search scans, users, or API..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - ORANGE THEME */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-orange-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100">
              <User className="h-4 w-4 text-orange-600" />
              <span className="text-gray-700 font-medium">{user?.name || 'User'}</span>
            </div>
            
            <button
              onClick={signOut}
              className="text-gray-700 hover:text-orange-600 font-medium flex items-center border border-gray-300 hover:border-orange-300 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}