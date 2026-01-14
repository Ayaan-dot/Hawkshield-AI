// components/dashboard/Sidebar.js - UPDATED
'use client';

import {
  LayoutDashboard, Search, FileVideo, BarChart, Key,
  Users, CreditCard, Settings, Shield, LogOut, Bell,
  ChevronRight, X, Home, Zap, BookOpen, DollarSign,
  Image, Video, Headphones, Radio
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // MATCHING NAVBAR STRUCTURE
  const menuSections = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      id: 'analyzer',
      icon: Search,
      label: 'Analyzer Hub',
      href: '/analyzer',
      subItems: [
        { icon: Image, label: 'Image Detection', href: '/analyzer/image' },
        { icon: Video, label: 'Video Detection', href: '/analyzer/video' },
        { icon: Headphones, label: 'Audio Detection', href: '/analyzer/audio' },
        { icon: Radio, label: 'Live Verification', href: '/analyzer/live' },
      ]
    },
    {
      id: 'analytics',
      icon: BarChart,
      label: 'Analytics',
      href: '/dashboard/analytics',
    },
    {
      id: 'api',
      icon: Key,
      label: 'API',
      subItems: [
        { label: 'API Keys', href: '/dashboard/api-keys' },
        { label: 'Documentation', href: '/api' },
        { label: 'Status', href: '/api/status' },
      ]
    },
    {
      id: 'resources',
      icon: BookOpen,
      label: 'Resources',
      subItems: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Documentation', href: '/documentation' },
        { label: 'Blog & Research', href: '/blog' },
        { label: 'Support Center', href: '/support' },
      ]
    },
    {
      id: 'team',
      icon: Users,
      label: 'Team',
      href: '/dashboard/team',
    },
    {
      id: 'billing',
      icon: DollarSign,
      label: 'Pricing & Billing',
      subItems: [
        { label: 'Pricing Plans', href: '/pricing' },
        { label: 'Billing', href: '/dashboard/billing' },
        { label: 'Usage', href: '/dashboard/usage' },
      ]
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
  ];

  return (
    <aside className="h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-3" onClick={onClose}>
            <div className="flex items-center">
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-xl shadow-lg">
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 border-2 border-white rounded-lg"></div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-3 border-l-transparent border-r-transparent border-b-white"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-4 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-600 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <div className="flex items-baseline">
                  <span className="text-lg font-black text-gray-900">Hawkshield</span>
                  <span className="text-orange-600 font-black text-lg tracking-tighter ml-1">AI</span>
                </div>
                <div className="text-[10px] text-gray-600 tracking-[0.15em] font-semibold uppercase mt-0.5">DASHBOARD</div>
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 truncate">{user?.name || 'User'}</div>
            <div className="text-sm text-gray-500 truncate">{user?.email}</div>
          </div>
          <Bell className="h-5 w-5 text-gray-400" />
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Plan:</span>
            <span className="font-medium text-orange-600">{user?.plan || 'Free'}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuSections.map((section) => {
            const Icon = section.icon;
            const isActive = pathname === section.href || 
                            (section.subItems && section.subItems.some(item => pathname === item.href));
            const isExpanded = expandedSection === section.id;

            return (
              <div key={section.id}>
                {section.href ? (
                  <Link
                    href={section.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-orange-50 text-orange-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 mr-3" />
                        <span className="font-medium">{section.label}</span>
                      </div>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    
                    {isExpanded && section.subItems && (
                      <div className="ml-6 mt-1 space-y-1">
                        {section.subItems.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                              pathname === item.href
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Link
            href="/help"
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            onClick={onClose}
          >
            <span>Help & Documentation</span>
          </Link>
          <button
            onClick={() => {
              signOut();
              if (typeof onClose === 'function') {
    onClose();
  }
            }}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}