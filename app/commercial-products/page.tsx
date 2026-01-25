'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import Link from 'next/link';
import Image from 'next/image';

const supabase = createClient();

// Amazon Associates Configuration
const AMAZON_TRACKING_ID = 'pestproindex-21';

interface Product {
  id: string;
  product_context: string;
  pest_category: string;
  product_type: string;
  product_name: string;
  asin: string;
  price_range: string;
  notes: string;
  is_active: boolean;
}

interface Category {
  emoji: string;
  name: string;
  id: string;
}

const getAmazonLink = (asin: string): string => {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_TRACKING_ID}`;
};

export default function CommercialProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories: Category[] = [
    { emoji: '🔧', name: 'Dehumidifiers (Mould Prevention)', id: 'General' },
    { emoji: '🐭', name: 'Rodents', id: 'Rodents' },
    { emoji: '🐝', name: 'Flying Insects', id: 'Flying Insects' },
    { emoji: '🪳', name: 'Cockroaches', id: 'Cockroaches' },
    { emoji: '🛏️', name: 'Bed Bugs', id: 'Bed Bugs' },
    { emoji: '🕊️', name: 'Birds', id: 'Birds' },
    { emoji: '📦', name: 'Stored Product Insects (Pantry Moths)', id: 'Stored Product Insects' },
    { emoji: '🦋', name: 'Textile Pests (Clothes & Carpet Moths)', id: 'Textile Pests (Moths)' },
    { emoji: '🐜', name: 'Ants', id: 'Ants' },
    { emoji: '🦟', name: 'Drain Flies', id: 'Drain Flies' },
  ];

  // Load products from database
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('amazon_products')
          .select('*')
          .eq('product_context', 'commercial')
          .eq('is_active', true)
          .order('pest_category', { ascending: true })
          .order('product_name', { ascending: true });

        if (error) throw error;

        console.log('Loaded commercial products:', data?.length);
        setProducts(data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Group products by category
  const groupedProducts: Record<string, Product[]> = {};
  products.forEach(product => {
    if (!groupedProducts[product.pest_category]) {
      groupedProducts[product.pest_category] = [];
    }
    groupedProducts[product.pest_category].push(product);
  });

  // Get categories that have products
  const categoriesWithProducts = categories.filter(cat => groupedProducts[cat.id]?.length > 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

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
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 px-6 py-3 rounded-full text-sm font-bold shadow-lg border-2 border-amber-300">
              <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
              </svg>
              <span>PROFESSIONAL-GRADE SOLUTIONS</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight text-center">
            Commercial<br />Pest Control<br />Products
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-medium text-center">
            Professional-grade solutions for businesses, facilities, and multi-site operations. <span className="font-bold text-white">Direct Amazon links for bulk ordering</span>. Trusted by commercial pest control providers across London.
          </p>
        </div>
      </div>

      {/* Features Box */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 mb-16">
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
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

      {/* Category Navigation Cards */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">Jump to Your Pest</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-500 transition-all duration-300 p-8 text-center group cursor-pointer"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.emoji}</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">{groupedProducts[category.id]?.length || 0} products</p>
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
        ) : categoriesWithProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          categoriesWithProducts.map((category) => (
            <section key={category.id} id={category.id} className="mb-16 scroll-mt-20">
              <h3 className="text-3xl font-black text-gray-900 mb-8">
                {category.emoji} {category.name}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedProducts[category.id]?.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{product.product_name}</h4>
                    
                    <p className="text-sm text-gray-600 mb-3 capitalize">{product.product_type.replace(/_/g, ' ')}</p>
                    
                    <p className="text-2xl font-black text-blue-600 mb-4">{product.price_range}</p>
                    
                    <p className="text-xs text-gray-500 mb-4">{product.notes}</p>
                    
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
            href="/commercial"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
          >
            <span>Find Commercial Providers</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* CTA 2: Residential Products */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-white rounded-3xl p-12 border-2 border-blue-200 text-center shadow-xl">
          <h3 className="text-3xl font-black text-gray-900 mb-4">
            Looking for Residential Products?
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            Browse our curated selection of home pest control solutions
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
          >
            <span>Browse Home Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2026 PestPro Index. All rights reserved.</p>
          <p className="text-sm">Amazon Associates: We earn commissions from qualifying purchases through Amazon Associates links</p>
        </div>
      </footer>
    </div>
  );
}
