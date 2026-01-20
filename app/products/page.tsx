'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
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
    { name: 'Mice', icon: '🐭' },
    { name: 'Rats', icon: '🐀' },
    { name: 'Ants', icon: '🐜' },
    { name: 'Bed Bugs', icon: '🛏️' },
    { name: 'Wasps', icon: '🐝' },
    { name: 'Cockroaches', icon: '🪳' },
    { name: 'Moths', icon: '🦋' },
    { name: 'Fleas', icon: '🦟' },
    { name: 'Spiders', icon: '🕷️' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-0 bg-white rounded-full px-6 py-3" style={{width: '210px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              src="/logo-header.png"
              alt="PestPro Index"
              width={180}
              height={60}
              className="h-auto"
            />
          </Link>
          
          {/* Navigation */}
          <nav className="flex gap-4">
            <Link href="/" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition text-white">Home</Link>
            <Link href="/residential" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition text-white">Residential</Link>
            <Link href="/commercial" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition text-white">Commercial</Link>
            <Link href="/professionals" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition text-white">Professionals</Link>
            <Link href="/about" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition text-white">About</Link>
            <Link href="/contact" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition text-white">Contact</Link>
          </nav>
        </div>
      </header>

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
          {/* Main Heading - WHITE and HUGE */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight text-center">
            Product<br />Recommendations
          </h1>
          
          {/* Subtitle - WHITE text with bold emphasis */}
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-medium text-center">
            Get the products that are <span className="font-bold text-white">ACTUALLY WORKING</span> for London homeowners <span className="font-bold text-white">RIGHT NOW</span>. Direct Amazon links with live pricing.
          </p>
        </div>
      </div>

      {/* Features Box - Premium Card with NEGATIVE MARGIN OVERLAP */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 mb-16">
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-t-3xl"></div>
          
          {/* Section heading */}
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-800 mr-4 rounded-full"></span>
            Your Complete Product Arsenal
          </h2>
          
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Live Product Links
                </h3>
            <p className="text-gray-600 leading-relaxed">
              Click straight through to Amazon - no searching, no guessing. Current prices and Prime delivery.
            </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Organized by Pest Type
                </h3>
            <p className="text-gray-600 leading-relaxed">
              Find exactly what you need in seconds. Filter by your specific pest problem.
            </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Regular Updates
                </h3>
            <p className="text-gray-600 leading-relaxed">
              Always current. We review the marketplace regularly to make sure you're seeing some of the most popular and effective products out there.
            </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  "Why This Works" Explanations
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Context on what makes each product effective for London households
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Product Categories - KEEP AS IS */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-black text-gray-900 mb-4">
            Product Categories
          </h3>
          <p className="text-xl text-gray-600">
            Expert recommendations for all common London pests
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {pestCategories.map((pest) => (
            <div
              key={pest.name}
              className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-200">
                {pest.icon}
              </div>
              <div className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {pest.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA 1: Professional Help */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 border border-gray-200 text-center">
          <p className="text-gray-700 mb-6 text-xl font-medium">
            Need professional help instead?
          </p>
          <Link
            href="/residential"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
          >
            <span>Find Verified Providers</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* CTA 2: DIY Guide */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-white rounded-3xl p-12 border-2 border-blue-200 text-center shadow-xl">
          <h3 className="text-3xl font-black text-gray-900 mb-4">
            Before You Buy
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            Learn when DIY works and when to call professionals
          </p>
          <a
            href="https://pestproindex.lemonsqueezy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
          >
            <span>Get DIY Guide - £1.99</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-16 mt-32 border-t-2 border-blue-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-lg mb-4">PestPro Index</h3>
              <p className="text-gray-400">
                London's neutral pest control directory
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white transition">
                  Home
                </Link>
                <Link href="/residential" className="block text-gray-400 hover:text-white transition">
                  Residential
                </Link>
                <Link href="/commercial" className="block text-gray-400 hover:text-white transition">
                  Commercial
                </Link>
                <Link href="/products" className="block text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <p className="text-gray-400">
                Free product recommendations for London pest control
              </p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 PestPro Index. London's neutral pest control directory.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
