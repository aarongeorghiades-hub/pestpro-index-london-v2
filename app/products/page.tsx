'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Amazon Associates Configuration
const AMAZON_TRACKING_ID = 'pestproindex-21'; // ✅ Active - verified Jan 24, 2026

/**
 * AMAZON ASSOCIATES VERIFICATION
 * Status: Active since January 24, 2026
 * Store ID: pestproindex-21
 * 
 * Products fetched from Supabase amazon_products table
 * All links auto-generated with tracking parameter
 * 
 * Revenue tracking: Monitor via Amazon Associates dashboard
 */

// Initialize Supabase client
const supabase = createClient(
  'https://ertsaqajwyoywxgkgfjq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVydHNhcWFqd3lveXd4Z2tnZmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzI0MjAsImV4cCI6MjA4MDk0ODQyMH0.be4LKgbL8N0dnHPgoU5n6AFgSf2OwLWeN8fTsTZOM4I'
);

interface AmazonProduct {
  id: string;
  pest_category: string;
  product_type: string;
  product_name: string;
  asin: string;
  amazon_url: string;
  price_range: string;
  notes: string;
}

const categoryEmojis: Record<string, string> = {
  'mice': '🐭',
  'rats': '🐀',
  'ants': '🐜',
  'cockroaches': '🪳',
  'bed_bugs': '🛏️',
  'moths': '🦋',
  'silverfish': '🪲',
  'fleas': '🦟',
  'wasps': '🐝',
  'dehumidifier': '🪲'  // Booklice / Psocids
};

const categoryLabels: Record<string, string> = {
  'mice': 'Mice',
  'rats': 'Rats',
  'ants': 'Ants',
  'cockroaches': 'Cockroaches',
  'bed_bugs': 'Bed Bugs',
  'moths': 'Moths',
  'silverfish': 'Silverfish',
  'fleas': 'Fleas',
  'wasps': 'Wasps',
  'dehumidifier': 'Booklice / Psocids'  // Updated category name
};

export default function ProductsPage() {
  const [products, setProducts] = useState<AmazonProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('amazon_products')
          .select('*')
          .eq('is_active', true)
          .order('pest_category')
          .order('product_type');

        if (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
          return;
        }

        setProducts(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.pest_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, AmazonProduct[]>);

  // Get unique categories in order
  const categories = Object.keys(groupedProducts).sort();

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

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 overflow-hidden">
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
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight text-center">
            Product<br />Recommendations
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-medium text-center">
            Get the products that are <span className="font-bold text-white">ACTUALLY WORKING</span> for London homeowners <span className="font-bold text-white">RIGHT NOW</span>. Direct Amazon links with live pricing.
          </p>
        </div>
      </div>

      {/* Features Box */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 mb-16">
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-t-3xl"></div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-800 mr-4 rounded-full"></span>
            Your Complete Product Arsenal
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Live Product Links</h3>
                <p className="text-gray-600 leading-relaxed">Click straight through to Amazon - no searching, no guessing. Current prices and Prime delivery.</p>
              </div>
            </div>

            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Organized by Pest Type</h3>
                <p className="text-gray-600 leading-relaxed">Find exactly what you need in seconds. Filter by your specific pest problem.</p>
              </div>
            </div>

            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Curated Selection</h3>
                <p className="text-gray-600 leading-relaxed">70+ verified UK products with real customer reviews and ratings.</p>
              </div>
            </div>

            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Regular Updates</h3>
                <p className="text-gray-600 leading-relaxed">Always current. We review the marketplace regularly to make sure you're seeing the most popular and effective products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emoji Navigation Cards */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">Jump to Your Pest</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-500 transition-all duration-300 p-8 text-center group cursor-pointer"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{categoryEmojis[category] || '🐛'}</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{categoryLabels[category] || category.replace('_', ' ')}</h3>
              <p className="text-sm text-gray-600">{groupedProducts[category]?.length || 0} products</p>
            </a>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          categories.map((category) => (
            <section key={category} id={category} className="mb-16 scroll-mt-20">
              <h3 className="text-3xl font-black text-gray-900 mb-8">
                {categoryLabels[category] || category.replace('_', ' ')}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedProducts[category]?.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{product.product_name}</h4>
                    
                    <p className="text-sm text-gray-600 mb-3 capitalize">{product.product_type.replace('_', ' ')}</p>
                    
                    <p className="text-2xl font-black text-blue-600 mb-4">{product.price_range}</p>
                    
                    <p className="text-xs text-gray-500 mb-4">{product.notes}</p>
                    
                    <a
                      href={product.amazon_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all"
                    >
                      View on Amazon
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
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
            <div>
              <h3 className="font-bold text-lg mb-4">PestPro Index</h3>
              <p className="text-gray-400">
                London's neutral pest control directory
              </p>
            </div>
            
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
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <p className="text-gray-400">
                Free product recommendations for London pest control
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 PestPro Index. London's neutral pest control directory.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
