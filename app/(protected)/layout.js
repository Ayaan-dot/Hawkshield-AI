// app/(protected)/layout.js
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TopNav from '../components/dashboard/TopNav';

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return null;

  return (
<div className="min-h-screen bg-gray-50">
      {/* ADD TopNav for analyzer pages */}
      <TopNav onMenuClick={() => {}} />
      {children}
    </div>
  );
}