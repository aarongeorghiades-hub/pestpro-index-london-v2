'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase';

// Cache bust: 2025-01-15-v3

// ============================================================================
// INTERFACES
// ============================================================================

interface Provider {
  canonical_id?: number;
  name: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  business_residential: boolean;
  is_featured?: boolean;
  
  // 20 pest type filters
  pest_mice: boolean;
  pest_rats: boolean;
  pest_rodents_general: boolean;
  pest_bed_bugs: boolean;
  pest_wasps: boolean;
  pest_cockroaches: boolean;
  pest_ants: boolean;
  pest_fleas: boolean;
  pest_moths: boolean;
  pest_pigeons: boolean;
  pest_birds_general: boolean;
  pest_squirrels: boolean;
  pest_flies: boolean;
  pest_bees: boolean;
  pest_foxes: boolean;
  pest_spiders: boolean;
  pest_seagulls: boolean;
  pest_silverfish: boolean;
  pest_beetles: boolean;
  pest_ladybirds: boolean;
  
  // 7 service feature filters
  service_eco_friendly: boolean;
  service_emergency_24_7: boolean;
  service_proofing: boolean;
  service_bpca_certified: boolean;
  service_guarantee: boolean;
  service_free_survey: boolean;
  service_weekend: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ResidentialPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ pests: [] as string[], services: [] as string[] });
  const pathname = usePathname();

  // ============================================================================
  // FETCH DATA
  // ============================================================================

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('Providers')
          .select('*')
          .eq('business_residential', true);

        if (error) throw error;
        setProviders(data || []);
        setFilteredProviders(data || []);
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // ============================================================================
  // FILTER LOGIC
  // ============================================================================

  useEffect(() => {
    let filtered = providers;

    if (filters.pests.length > 0) {
      filtered = filtered.filter(p => 
        filters.pests.some(pest => p[pest as keyof Provider] === true)
      );
    }

    if (filters.services.length > 0) {
      filtered = filtered.filter(p => 
        filters.services.some(service => p[service as keyof Provider] === true)
      );
    }

    setFilteredProviders(filtered);
  }, [filters, providers]);

  // ============================================================================
  // FILTER DEFINITIONS
  // ============================================================================

  const pestFilters = [
    { label: 'Mice', value: 'pest_mice' },
    { label: 'Rats', value: 'pest_rats' },
    { label: 'Rodents (General)', value: 'pest_rodents_general' },
    { label: 'Bed Bugs', value: 'pest_bed_bugs' },
    { label: 'Wasps & Hornets', value: 'pest_wasps' },
    { label: 'Cockroaches', value: 'pest_cockroaches' },
    { label: 'Ants', value: 'pest_ants' },
    { label: 'Fleas', value: 'pest_fleas' },
    { label: 'Moths', value: 'pest_moths' },
    { label: 'Pigeons', value: 'pest_pigeons' },
    { label: 'Birds (General)', value: 'pest_birds_general' },
    { label: 'Squirrels', value: 'pest_squirrels' },
    { label: 'Flies', value: 'pest_flies' },
    { label: 'Bees', value: 'pest_bees' },
    { label: 'Foxes', value: 'pest_foxes' },
    { label: 'Spiders', value: 'pest_spiders' },
    { label: 'Seagulls', value: 'pest_seagulls' },
    { label: 'Silverfish', value: 'pest_silverfish' },
    { label: 'Beetles', value: 'pest_beetles' },
    { label: 'Ladybirds', value: 'pest_ladybirds' },
  ];

  const serviceFilters = [
    { label: 'Eco-Friendly / Pet-Safe', value: 'service_eco_friendly' },
    { label: '24/7 Emergency Service', value: 'service_emergency_24_7' },
    { label: 'Proofing / Prevention', value: 'service_proofing' },
    { label: 'BPCA Certified', value: 'service_bpca_certified' },
    { label: 'Treatment Guarantee', value: 'service_guarantee' },
    { label: 'Free Survey / Quote', value: 'service_free_survey' },
    { label: 'Weekend Service', value: 'service_weekend' },
  ];

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/residential', label: 'Residential' },
    { href: '/commercial', label: 'Commercial' },
    { href: '/professionals', label: 'Professionals' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const handleFilterChange = (type: 'pests' | 'services', value: string) => {
    setFilters(prev => {
      const currentFilters = prev[type];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(f => f !== value)
        : [...currentFilters, value];
      return { ...prev, [type]: newFilters };
    });
  };

  const clearFilters = () => {
    setFilters({ pests: [], services: [] });
  };

  const getFilterCount = (filterValue: string) => {
    return providers.filter(p => p[filterValue as keyof Provider] === true).length;
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-white">
      {/* NAVIGATION */}
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

          {/* NAVIGATION - ALL TABS SAME BORDER */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200
                   ${pathname === item.href
                    ? 'bg-[#1e3a8a] text-white'
                    : 'bg-transparent text-white hover:border-white/60 hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/london-skyline.png" 
            alt="London skyline illustration" 
            fill
            className="object-cover opacity-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/50 via-[#2563eb]/45 to-[#1e3a8a]/50"></div>
        </div>
        
        {/* CENTERED HERO CONTENT */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]">
            Residential Pest Control
          </h1>
          <p className="text-3xl md:text-4xl mb-6 font-extralight tracking-[0.15em] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
            481 Verified Providers in London
          </p>
          <p className="text-xl text-white font-semibold max-w-3xl leading-relaxed drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)] opacity-95">
            Filter by pest type and service features across our complete directory. 68% of providers have verified Google Reviews. No endorsements, no commissions—just transparent, provider-stated information.
          </p>
        </div>
      </section>

      {/* PDF & PRODUCTS SECTION - SIDE BY SIDE */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT: PDF GUIDE */}
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                DIY or Professional? Make the Right Call.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                You've got a pest problem. The question isn't "can I handle this?" — it's "SHOULD I handle this?"
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our Residential DIY Decision Guide (£1.99) helps you decide by showing:
              </p>

              {/* 4 Bullets */}
              <div className="max-w-2xl mx-auto text-left mb-8 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">✓</span>
                  <p className="text-gray-700">When DIY typically works (and saves you money)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">✓</span>
                  <p className="text-gray-700">When DIY usually fails (so you don't waste time)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">✓</span>
                  <p className="text-gray-700">The "stop signals" that tell you it's time to call a professional</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">✓</span>
                  <p className="text-gray-700">What actually works (and what wastes money) for each pest type</p>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Make an informed decision before you spend £100+ on the wrong approach.
                </p>
                <Link 
                  href="https://pestproindex.lemonsqueezy.com/checkout/buy/8d8b4f4a-a913-48b3-bf8d-dfcaf6fcb5d6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white text-lg font-bold rounded-xl hover:from-[#2563eb] hover:to-[#3b82f6] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <span className="text-2xl">📄</span>
                  <span>Get the Guide - £1.99</span>
                </Link>
              </div>
            </div>

            {/* RIGHT: PRODUCTS LINK */}
            <div className="text-center flex flex-col justify-center bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Need DIY Products?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Browse our curated selection of the most popular pest control products available today, organized by pest type. Includes user ratings and direct Amazon purchase links.
              </p>
              <Link 
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white text-lg font-bold rounded-xl hover:from-[#2563eb] hover:to-[#3b82f6] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 mx-auto"
              >
                View Products Page
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: FEATURED PROVIDERS - 4 COLUMNS, NO IMAGE */}
      <section className="relative bg-gradient-to-br from-amber-50 to-white py-16 border-b-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Featured Providers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our featured provider of the week successfully tackled a tough pest problem in London.
            </p>
          </div>

          {/* 4-COLUMN GRID - NO AI IMAGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers
              .filter(p => 
                p.google_rating && p.google_rating >= 4.8 && 
                p.google_review_count && p.google_review_count >= 30 &&
                p.address && (
                  p.address.toLowerCase().includes('london') ||
                  p.address.toLowerCase().includes('sw') ||
                  p.address.toLowerCase().includes('se') ||
                  p.address.toLowerCase().includes('nw') ||
                  p.address.toLowerCase().includes('ne') ||
                  p.address.toLowerCase().includes('ec') ||
                  p.address.toLowerCase().includes('wc') ||
                  p.address.toLowerCase().includes('e1') ||
                  p.address.toLowerCase().includes('w1')
                )
              )
              .slice(0, 8)
              .map(provider => (
                <div 
                  key={provider.canonical_id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-amber-400"
                >
                  
                  {/* Featured Badge */}
                  <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                    Featured
                  </div>

                  {/* Company Name */}
                  <h3 className="font-black text-base text-gray-900 mb-2 leading-tight line-clamp-2">
                    {provider.name}
                  </h3>

                  {/* ADDRESS */}
                  {provider.address && (
                    <div className="flex items-start gap-2 mb-3 text-xs text-gray-600">
                      <span className="text-red-500 mt-0.5">📍</span>
                      <span className="line-clamp-2">{provider.address}</span>
                    </div>
                  )}

                  {/* Rating */}
                  {provider.google_rating && provider.google_rating > 0 && (
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-lg font-bold text-gray-900">
                        {provider.google_rating.toFixed(1)}
                      </span>
                      {provider.google_review_count && provider.google_review_count > 0 && (
                        <span className="text-xs text-gray-600">
                          ({provider.google_review_count})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Contact Buttons */}
                  <div className="space-y-2">
                    {provider.phone && (
                      <a 
                        href={`tel:${provider.phone}`}
                        className="block text-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-bold rounded-lg transition-all shadow-md"
                      >
                        📞 {provider.phone}
                      </a>
                    )}
                    {provider.website && (
                      <a 
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center px-3 py-2 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold rounded-lg transition-all"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* PROVIDER OF THE MONTH */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 border-b-2 border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Featured Provider Story
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              See how London's pest control providers solve real problems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each month, we publish a detailed case study: the customer's challenge, the provider's approach, and the outcome. No fluff—just practical insights into what professional pest control actually looks like.
            </p>
            <p className="text-base text-gray-600 mt-4">
              Whether you're dealing with mice, wasps, or commercial infestations, these stories help you understand what "good work" looks like before you spend a penny.
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gray-100 text-gray-600 text-lg font-bold rounded-xl border-2 border-gray-300">
            <span className="text-2xl">📖</span>
            <span>First Story Coming Soon</span>
          </div>

        </div>
      </section>

      {/* SECTION 2: TOP-RATED PROVIDERS */}
      <section className="relative bg-gradient-to-br from-white to-gray-50 py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Top-Rated Providers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Providers with 4.5+ star ratings and 30+ verified reviews
            </p>
          </div>

          {/* Top 8 High-Rated Cards (4 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers
              .filter(p => 
                p.google_rating && p.google_rating >= 4.5 && 
                p.google_review_count && p.google_review_count >= 30 &&
                !(p.google_rating >= 4.8 && p.google_review_count >= 30)
              )
              .slice(0, 8)
              .map(provider => (
                <div 
                  key={provider.canonical_id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-[#1e3a8a]"
                >
                  
                  {/* Trophy */}
                  <div className="text-3xl mb-2">🏆</div>

                  {/* Company Name */}
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-tight line-clamp-2">
                    {provider.name}
                  </h3>

                  {/* ADDRESS */}
                  {provider.address && (
                    <div className="flex items-start gap-1 mb-3 text-xs text-gray-600">
                      <span className="text-red-500 mt-0.5">📍</span>
                      <span className="line-clamp-1">{provider.address}</span>
                    </div>
                  )}

                  {/* Rating */}
                  {provider.google_rating && (
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-lg font-bold text-gray-900">
                        {provider.google_rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-600">
                        ({provider.google_review_count})
                      </span>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="space-y-2">
                    {provider.phone && (
                      <a 
                        href={`tel:${provider.phone}`}
                        className="block text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        📞 Call
                      </a>
                    )}
                    {provider.website && (
                      <a 
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center px-3 py-2 border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold rounded-lg transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: FULL PROVIDER LIST */}
      <section className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Full List of London Pest Control Providers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All 481 residential providers with advanced filtering
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* FILTER SIDEBAR */}
            <aside className="w-full lg:w-80 lg:flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24 border border-gray-100 max-h-[calc(100vh-7rem)] overflow-y-auto">
                
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  {(filters.pests.length > 0 || filters.services.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Results Count */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-black text-blue-900">{filteredProviders.length}</p>
                  <p className="text-sm text-blue-700">Providers Found</p>
                </div>

                {/* Pest Type Filters */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Pest Type
                  </h3>
                  <div className="space-y-2">
                    {pestFilters.map(filter => (
                      <label key={filter.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.pests.includes(filter.value)}
                          onChange={() => handleFilterChange('pests', filter.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 flex-1">{filter.label}</span>
                        <span className="text-xs text-gray-500 font-medium">
                          ({getFilterCount(filter.value)})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Feature Filters */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Service Features
                  </h3>
                  <div className="space-y-2">
                    {serviceFilters.map(filter => (
                      <label key={filter.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.services.includes(filter.value)}
                          onChange={() => handleFilterChange('services', filter.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 flex-1">{filter.label}</span>
                        <span className="text-xs text-gray-500 font-medium">
                          ({getFilterCount(filter.value)})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* PROVIDER CARDS GRID */}
            <main className="flex-1">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading providers...</p>
                </div>
              ) : filteredProviders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">No providers match your filters</p>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map(provider => {
                    const isTrophy = provider.google_rating && provider.google_rating >= 4.5 && 
                                    provider.google_review_count && provider.google_review_count >= 30;
                    const borderClass = isTrophy ? 'border-l-4 border-amber-500' : 'border-l-4 border-[#1e3a8a]';

                    return (
                      <div key={provider.canonical_id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 ${borderClass}`}>
                        {isTrophy && <div className="text-2xl mb-2">🏆</div>}
                        <h3 className="font-bold text-base text-gray-900 mb-2 leading-tight line-clamp-2">
                          {provider.name}
                        </h3>
                        {provider.address && (
                          <div className="flex items-start gap-1 mb-2 text-xs text-gray-600">
                            <span className="text-red-500">📍</span>
                            <span className="line-clamp-1">{provider.address}</span>
                          </div>
                        )}
                        {provider.google_rating && (
                          <div className="flex items-center gap-1 mb-3">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-bold text-gray-900">{provider.google_rating.toFixed(1)}</span>
                            <span className="text-xs text-gray-600">({provider.google_review_count})</span>
                          </div>
                        )}
                        <div className="space-y-2">
                          {provider.phone && (
                            <a href={`tel:${provider.phone}`} className="block text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg">
                              📞 {provider.phone}
                            </a>
                          )}
                          {provider.website && (
                            <a href={provider.website} target="_blank" rel="noopener noreferrer" className="block text-center px-3 py-2 border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold rounded-lg">
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>

          </div>
        </div>
      </section>

    </div>
  );
}
