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
  const [selectedCategory, setSelectedCategory] = useState<string>('rodents');
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { emoji: '🐭', name: 'Rodents', id: 'Rodents' },
    { emoji: '🐝', name: 'Flying Insects', id: 'Flying Insects' },
    { emoji: '🪳', name: 'Cockroaches', id: 'Cockroaches' },
    { emoji: '🛏️', name: 'Bed Bugs', id: 'Bed Bugs' },
    { emoji: '🕊️', name: 'Birds', id: 'Birds' },
    { emoji: '📦', name: 'Stored Product Insects', id: 'Stored Product Insects' },
    { emoji: '🐜', name: 'Ants', id: 'Ants' },
    { emoji: '🦟', name: 'Drain Flies', id: 'Drain Flies' },
    { emoji: '🦋', name: 'Textile Pests', id: 'Textile Pests (Moths)' },
    { emoji: '🔧', name: 'General', id: 'General' },
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
          .order('pest_category', { ascending: true });

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

  // Get products for selected category
  const categoryProducts = products.filter(
    p => p.pest_category === selectedCategory
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading commercial products...</p>
        </div>
      </div>
    );
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
            <Link href="/commercial-products" className="px-6 py-2.5 font-medium text-base border-2 white/40 rounded-xl transition-all duration-200 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
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

      {/* Category Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-12">Browse by Category</h2>
        
        <div className="grid md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                document.getElementById(`products-${category.id}`)?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className={`p-6 rounded-2xl transition-all text-center ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-blue-50 text-gray-900 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <div className="text-4xl mb-2">{category.emoji}</div>
              <div className="font-bold text-sm">{category.name}</div>
              <div className="text-xs mt-2 opacity-75">
                {products.filter(p => p.pest_category === category.id).length} products
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Products by Category */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          {categories.map((category) => {
            const categoryProds = products.filter(p => p.pest_category === category.id);
            
            if (categoryProds.length === 0) return null;

            return (
              <section 
                key={category.id} 
                id={`products-${category.id}`}
                className="mb-16"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  {category.emoji} {category.name}
                </h3>
                
                <div className="grid gap-6">
                  {categoryProds.map((product) => (
                    <a
                      key={product.id}
                      href={getAmazonLink(product.asin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-l-4 border-blue-600 hover:border-blue-800"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-gray-900 flex-1">
                          {product.product_name}
                        </h4>
                        <span className="text-2xl font-bold text-blue-600 ml-4">
                          {product.price_range}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {product.product_type.replace(/_/g, ' ').toUpperCase()}
                      </p>
                      
                      {product.notes && (
                        <p className="text-sm text-gray-700 mb-4">{product.notes}</p>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Amazon UK • ASIN: {product.asin}
                        </span>
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                          View on Amazon →
                        </button>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">Need Help Finding the Right Products?</h2>
          <p className="text-xl mb-8 opacity-90">Contact our team for personalized recommendations for your commercial pest control needs</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition">
            Get Expert Advice
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
