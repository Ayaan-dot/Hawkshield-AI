// app/dashboard/layout.js
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopNav from '../components/dashboard/TopNav';
import Footer from '../components/Footer'; // Import your footer

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block md:w-64 md:fixed md:inset-y-0 md:z-30">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64"> {/* ← CRITICAL: This margin pushes everything right */}
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
        
        {/* Footer - Now has proper spacing */}
        <Footer />
      </div>
    </div>
  );
}