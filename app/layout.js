// app/layout.js
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hawkshield AI - Real-Time Deepfake Detection',
  description: 'Enterprise-grade AI-powered deepfake detection for images, videos, and audio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}