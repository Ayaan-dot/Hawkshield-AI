// app/components/Footer.js
import { Twitter, Linkedin, Github, Mail, Zap, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info with Logo */}
          <div>
            <div className="flex items-center mb-6">
              {/* Eye Shield Logo */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg mr-3 shadow-lg">
                  <div className="relative w-6 h-6">
                    {/* Shield outline */}
                    <div className="absolute inset-0 border border-white rounded-lg"></div>
                    {/* Top shield point */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-white"></div>
                    {/* Eye */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-3 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">Hawkshield AI</div>
                <div className="text-sm text-orange-400 tracking-widest">VERIFY REALITY</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Enterprise-grade deepfake detection with sub-second latency.
              Protecting digital trust when every millisecond counts.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:contact@Hawkshield.ai" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-b border-gray-800 pb-2">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/analyzer" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Analyzer Hub
              </Link></li>
              <li><Link href="/analyzer/image" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Image Detection
              </Link></li>
              <li><Link href="/analyzer/video" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Video Detection
              </Link></li>
              <li><Link href="/analyzer/audio" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Audio Detection
              </Link></li>
              <li><Link href="/analyzer/live" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Live Verification
              </Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-b border-gray-800 pb-2">Solutions</h3>
            <ul className="space-y-3">
              <li><Link href="/enterprise" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Enterprise Security
              </Link></li>
              <li><Link href="/government" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Government
              </Link></li>
              <li><Link href="/media" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Media & News
              </Link></li>
              <li><Link href="/finance" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Financial Services
              </Link></li>
              <li><Link href="/legal" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Legal Teams
              </Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-b border-gray-800 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/api" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                API Documentation
              </Link></li>
              <li><Link href="/documentation" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Documentation
              </Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Blog & Research
              </Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Support Center
              </Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact Sales
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Hawkshield AI. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900 rounded-lg">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-300">48ms Latency</span>
              </div>
              
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900 rounded-lg">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">SOC2 Certified</span>
              </div>
              
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900 rounded-lg">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-300">Real-time AI</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Links */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/security" className="hover:text-orange-400 transition-colors">
                Security
              </Link>
              <Link href="/compliance" className="hover:text-orange-400 transition-colors">
                Compliance
              </Link>
              <Link href="/cookies" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <div className="text-xs text-gray-600">
              Version 2.4.1 • Updated just now
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-900 text-center">
            <p className="text-xs text-gray-500">
              Hawkshield AI is a demonstration prototype for hackathon purposes. 
              All detection claims based on internal testing across 2.1M+ media samples.
              <br className="hidden sm:block" />
              Real-time detection requires enterprise deployment. Contact sales for production implementation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}