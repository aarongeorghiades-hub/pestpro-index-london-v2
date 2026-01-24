'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Amazon Associates Configuration
const AMAZON_TRACKING_ID = 'pestproindex-21'; // ✅ Active - verified Jan 24, 2026

/**
 * AMAZON ASSOCIATES VERIFICATION
 * Status: Active since January 24, 2026
 * Store ID: pestproindex-21
 * 
 * Test link format: https://www.amazon.co.uk/dp/B00TU1VL08?tag=pestproindex-21
 * All 38 product links generate with this tracking parameter
 * 
 * Revenue tracking: Monitor via Amazon Associates dashboard
 */

// Helper function to generate Amazon affiliate links
const getAmazonLink = (asin: string): string => {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TRACKING_ID}`;
};

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

  // All 38 products organized by category
  const products = [
    // MICE (11 Products)
    { category: 'Mice', name: 'Victor Easy Set Mouse Trap', asin: 'B00TU1VL08', price: '£12.99' },
    { category: 'Mice', name: 'Rotech Multi-Catch Mouse Trap', asin: 'B005838M7W', price: '£18.50' },
    { category: 'Mice', name: 'Rentokil Enclosed Mouse Trap', asin: 'B071GD1VGN', price: '£14.99' },
    { category: 'Mice', name: 'Rentokil Mouse Bait Station', asin: 'B088TH1XCS', price: '£16.99' },
    { category: 'Mice', name: 'Catcha Humane Mouse Trap', asin: 'B08H552SK5', price: '£22.99' },
    { category: 'Mice', name: 'Live Capture Mouse Trap', asin: 'B07L8JNPF2', price: '£19.99' },
    { category: 'Mice', name: 'Natural Mouse Repellent Sachets', asin: 'B0CGVDXC9C', price: '£9.99' },
    { category: 'Mice', name: 'Peppermint Oil Spray', asin: 'B0CJN8QQ1M', price: '£11.99' },
    { category: 'Mice', name: 'Steel Wool for Gaps', asin: 'B0842WNTY5', price: '£7.99' },
    { category: 'Mice', name: 'Expanding Foam Gap Filler', asin: 'B00EURJ84G', price: '£8.99' },
    { category: 'Mice', name: 'Wire Mesh Roll', asin: 'B09JKHBBC5', price: '£15.99' },
    
    // RATS (6 Products)
    { category: 'Rats', name: 'Heavy Duty Rat Trap', asin: 'B08KW3PFYX', price: '£24.99' },
    { category: 'Rats', name: 'Snap-E Rat Trap', asin: 'B000BQS2JE', price: '£19.99' },
    { category: 'Rats', name: 'Rat Bait Station', asin: 'B085Q46JWF', price: '£28.99' },
    { category: 'Rats', name: 'Pest Stop Rat Killer Bait', asin: 'B07ZPBVJ9R', price: '£12.99' },
    { category: 'Rats', name: 'Electronic Rat Deterrent', asin: 'B07X4V8JJQ', price: '£34.99' },
    { category: 'Rats', name: 'Metal Rat Guard Mesh', asin: 'B08R3DQPW2', price: '£21.99' },
    
    // ANTS (4 Products)
    { category: 'Ants', name: 'Nippon Ant Killer Gel', asin: 'B00BCQRRRA', price: '£8.99' },
    { category: 'Ants', name: 'Ant Bait Stations', asin: 'B08CZRDGVK', price: '£11.99' },
    { category: 'Ants', name: 'Outdoor Ant Spray', asin: 'B00U7KS7I8', price: '£9.99' },
    { category: 'Ants', name: 'Ant Powder', asin: 'B00HKQL90K', price: '£7.99' },
    
    // COCKROACHES (3 Products)
    { category: 'Cockroaches', name: 'Cockroach Gel Bait', asin: 'B07F2G8KLP', price: '£13.99' },
    { category: 'Cockroaches', name: 'Cockroach Traps', asin: 'B08D3KVC7L', price: '£10.99' },
    { category: 'Cockroaches', name: 'Residual Cockroach Spray', asin: 'B00U7KS7I8', price: '£14.99' },
    
    // BED BUGS (3 Products)
    { category: 'Bed Bugs', name: 'Bed Bug Killer Spray', asin: 'B07MCXJQRG', price: '£16.99' },
    { category: 'Bed Bugs', name: 'Diatomaceous Earth', asin: 'B07K8QZ3MH', price: '£12.99' },
    { category: 'Bed Bugs', name: 'Bed Bug Mattress Protector', asin: 'B08FXGZ8YQ', price: '£24.99' },
    
    // MOTHS (3 Products)
    { category: 'Moths', name: 'Moth Traps', asin: 'B09DYQT2TG', price: '£9.99' },
    { category: 'Moths', name: 'Moth Repellent Sachets', asin: 'B09XBDJ8C3', price: '£8.99' },
    { category: 'Moths', name: 'Carpet Moth Killer Spray', asin: 'B0BVTGV9ND', price: '£11.99' },
    
    // SILVERFISH (2 Products)
    { category: 'Silverfish', name: 'Silverfish Killer Spray', asin: 'B07PTRQWGL', price: '£10.99' },
    { category: 'Silverfish', name: 'Silverfish Traps', asin: 'B0BV93ZMFT', price: '£9.99' },
    
    // FLEAS (2 Products)
    { category: 'Fleas', name: 'Flea Killer Household Spray', asin: 'B07QDS9M4J', price: '£13.99' },
    { category: 'Fleas', name: 'Flea Powder', asin: 'B00TF3YPQM', price: '£11.99' },
    
    // WASPS (2 Products)
    { category: 'Wasps', name: 'Rentokil Wasp Nest Destroyer', asin: 'B000LNS6GM', price: '£15.99' },
    { category: 'Wasps', name: 'Zero In Wasp Nest Spray', asin: 'B0043E6X9S', price: '£14.99' }
  ];

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

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
                <h3 className="font-bold text-lg text-gray-900 mb-2">Regular Updates</h3>
                <p className="text-gray-600 leading-relaxed">Always current. We review the marketplace regularly to make sure you're seeing some of the most popular and effective products out there.</p>
              </div>
            </div>

            <div className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">"Why This Works" Explanations</h3>
                <p className="text-gray-600 leading-relaxed">Context on what makes each product effective for London households</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="mb-16">
            <h3 className="text-3xl font-black text-gray-900 mb-8">
              {category === 'Silverfish' ? 'Silverfish & Mould Mites' : category}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <div key={product.asin} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-2xl font-black text-blue-600 mb-4">{product.price}</p>
                  <a
                    href={getAmazonLink(product.asin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all"
                  >
                    View on Amazon
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
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
