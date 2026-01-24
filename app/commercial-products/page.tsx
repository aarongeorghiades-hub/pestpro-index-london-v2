'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Amazon Associates Configuration
const AMAZON_TRACKING_ID = 'pestproindex-21'; // Active Amazon Associates Store ID

/**
 * AMAZON ASSOCIATES VERIFICATION
 * Status: Active since January 24, 2026
 * Store ID: pestproindex-21
 * 
 * Test link format: https://www.amazon.co.uk/dp/B00TU1VL08?tag=pestproindex-21
 * All product links generate with this tracking parameter
 * 
 * Revenue tracking: Monitor via Amazon Associates dashboard
 */

// Helper function to generate Amazon affiliate links
const getAmazonLink = (asin: string): string => {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TRACKING_ID}`;
};

export default function CommercialProductsPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

  const pestCategories = [
    { name: 'Rodents (Mice & Rats)', icon: '🐭' },
    { name: 'Flying Insects (Flies, Wasps)', icon: '🐝' },
    { name: 'Cockroaches', icon: '🪳' },
    { name: 'Bed Bugs (Hotels)', icon: '🛏️' },
    { name: 'Birds (Pigeons)', icon: '🕊️' },
    { name: 'Stored Product Insects', icon: '📦' },
    { name: 'Ants', icon: '🐜' },
    { name: 'Drain Flies', icon: '🦟' },
    { name: 'Textile Pests (Moths)', icon: '🦋' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#050812] via-[#1e3a8a] to-[#050812] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/logo-header.png" 
              alt="PestPro Index Logo" 
              width={180} 
              height={50}
              className="h-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-[#1e3a8a] text-white">
              Home
            </Link>
            <Link href="/residential" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Residential
            </Link>
            <Link href="/commercial" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Commercial
            </Link>
            <Link href="/professionals" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Professionals
            </Link>
            <Link href="/products" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Home Products
            </Link>
            <Link href="/commercial-products" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Commercial Products
            </Link>
            <Link href="/about" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              About
            </Link>
            <Link href="/contact" className="px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - DARK BLUE */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}
          ></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          {/* Coming Soon Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 px-6 py-3 rounded-full text-sm font-bold shadow-lg border-2 border-amber-300">
              <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
              </svg>
              <span>PROFESSIONAL-GRADE SOLUTIONS</span>
            </div>
          </div>

          {/* Main Heading - WHITE and HUGE */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight text-center">
            Commercial<br />Pest Control<br />Products
          </h1>
          
          {/* Subtitle - WHITE text with bold emphasis */}
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-medium text-center">
            Professional-grade solutions for businesses, facilities, and multi-site operations. <span className="font-bold text-white">Direct Amazon links for bulk ordering</span>. Trusted by commercial pest control providers across London.
          </p>
        </div>
      </div>

      {/* Features Box - Premium Card with NEGATIVE MARGIN OVERLAP */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 mb-16">
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-t-3xl"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Bulk Ordering</h3>
              <p className="text-gray-600 text-sm">Direct Amazon links with commercial pricing for large orders</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Verified Products</h3>
              <p className="text-gray-600 text-sm">Only professional-grade products recommended by commercial providers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm">Amazon Prime eligible for quick delivery to your facility</p>
            </div>
          </div>
        </div>
      </div>



      {/* Pest Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-12">Commercial Pest Solutions by Category</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {pestCategories.map((category) => (
            <div key={category.name} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-blue-200">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.name}</h3>
              <p className="text-gray-700 mb-6">Professional-grade solutions and equipment for commercial pest control</p>
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                View Products →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">Featured Commercial Products</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional Rodent Control Kit</h3>
              <p className="text-gray-700 mb-4">Complete commercial-grade rodent management system with traps, baits, and monitoring equipment</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-blue-600">£89.99</span>
                <a href={getAmazonLink("B00TU1VL08")} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                  View on Amazon
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Commercial Insect Spray System</h3>
              <p className="text-gray-700 mb-4">Heavy-duty spraying equipment for large facilities and multi-site operations</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-blue-600">£149.99</span>
                <a href={getAmazonLink("B07Y5KXQKK")} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                  View on Amazon
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional Bed Bug Treatment Kit</h3>
              <p className="text-gray-700 mb-4">Commercial-strength bed bug detection and treatment solution for hotels and hospitality</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-blue-600">£199.99</span>
                <a href={getAmazonLink("B08QBVVQY8")} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                  View on Amazon
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Bird Control & Proofing System</h3>
              <p className="text-gray-700 mb-4">Complete bird deterrent and proofing solution for commercial buildings and facilities</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-blue-600">£249.99</span>
                <a href={getAmazonLink("B07YFVVVV7")} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                  View on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">Ready to upgrade your commercial pest control product set?</h2>
          <p className="text-xl mb-8 text-blue-100">Browse our complete selection of professional-grade pest control products and equipment</p>
          <button className="px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-50 transition">
            Browse All Commercial Products
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/residential" className="hover:text-white transition">Residential</Link></li>
                <li><Link href="/commercial" className="hover:text-white transition">Commercial</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="hover:text-white transition">Home Products</Link></li>
                <li><Link href="/commercial-products" className="hover:text-white transition">Commercial Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2024 PestPro Index. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
