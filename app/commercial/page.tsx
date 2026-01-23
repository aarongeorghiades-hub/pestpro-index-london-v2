'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const supabase = createClient();

interface Provider {
  canonical_id: string;
  provider_name: string;
  name: string;
  website: string | null;
  phone: string | null;
  address: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  [key: string]: any;
}

interface FilterCounts {
  [key: string]: number;
}

export default function CommercialPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCounts, setFilterCounts] = useState<FilterCounts>({});
  const [filters, setFilters] = useState({ sectors: [] as string[], methods: [] as string[], contracts: [] as string[], capabilities: [] as string[], credentials: [] as string[], certifications: [] as string[] });
  const [sortBy, setSortBy] = useState('quality');
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/residential', label: 'Residential' },
    { href: '/commercial', label: 'Commercial' },
    { href: '/professionals', label: 'Professionals' },
    { href: '/products', label: 'Home Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  // Filter categories - 38 commercial filters
  const filterCategories = {
    certifications: [
      { key: 'bpca_member', label: 'BPCA Member' },
      { key: 'npta_member', label: 'NPTA Member' },
      { key: 'rsph_level_2', label: 'RSPH Level 2' },
      { key: 'safe_contractor', label: 'Safe Contractor' },
      { key: 'chas', label: 'CHAS' },
      { key: 'basis_prompt', label: 'Basis Prompt' },
      { key: 'cepa_certified', label: 'CEPA Certified' },
      { key: 'iso_9001', label: 'ISO 9001' },
      { key: 'iso_14001', label: 'ISO 14001' },
      { key: 'iso_45001', label: 'ISO 45001' },
      { key: 'constructionline', label: 'Constructionline' },
      { key: 'trustmark', label: 'Trustmark' },
    ],
    methods: [
      { key: 'heat_treatment', label: 'Heat Treatment' },
      { key: 'falconry_bird_control', label: 'Falconry/Bird Control' },
      { key: 'detection_dogs', label: 'Detection Dogs' },
      { key: 'high_rise_rope_access', label: 'High-Rise Rope Access' },
      { key: 'fumigation', label: 'Fumigation' },
      { key: 'proofing_services', label: 'Proofing Services' },
    ],
    contracts: [
      { key: 'flexible_contracts', label: 'Flexible Contracts' },
      { key: 'no_tie_in_contracts', label: 'No Tie-In Contracts' },
      { key: 'retainer_services', label: 'Retainer Services' },
      { key: 'one_off_services', label: 'One-Off Services' },
      { key: 'emergency_24_7', label: 'Emergency 24/7' },
    ],
    sectors: [
      { key: 'property_management', label: 'Property Management' },
      { key: 'social_housing', label: 'Social Housing' },
      { key: 'hospitality', label: 'Hospitality' },
      { key: 'healthcare', label: 'Healthcare' },
      { key: 'education', label: 'Education' },
      { key: 'retail', label: 'Retail' },
      { key: 'food_production', label: 'Food Production' },
      { key: 'warehousing_logistics', label: 'Warehousing/Logistics' },
      { key: 'offices', label: 'Offices' },
      { key: 'leisure_facilities', label: 'Leisure Facilities' },
    ],
    capabilities: [
      { key: 'multi_site_coverage', label: 'Multi-Site Coverage' },
      { key: 'national_coverage', label: 'National Coverage' },
      { key: 'unmarked_vehicles', label: 'Unmarked Vehicles' },
      { key: 'non_disruptive_services', label: 'Non-Disruptive Services' },
      { key: 'out_of_hours_services', label: 'Out-of-Hours Services' },
      { key: 'same_day_service', label: 'Same-Day Service' },
    ],
    credentials: [
      { key: 'free_surveys', label: 'Free Surveys' },
      { key: 'free_quotes', label: 'Free Quotes' },
      { key: 'guarantees_offered', label: 'Guarantees Offered' },
      { key: 'years_established_25_plus', label: '25+ Years Established' },
      { key: 'technicians_50_plus', label: '50+ Technicians' },
      { key: 'service_areas_documented', label: 'Service Areas Documented' },
      { key: 'insurance_details_published', label: 'Insurance Details Published' },
      { key: 'eco_friendly_methods', label: 'Eco-Friendly Methods' },
      { key: 'humane_non_lethal_methods', label: 'Humane/Non-Lethal Methods' },
      { key: 'peta_endorsed', label: 'PETA Endorsed' },
      { key: 'rspca_recognized', label: 'RSPCA Recognized' },
    ],
  };

  // Load providers
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const { data, error } = await supabase
          .from('Providers')
          .select('*')
          .eq('business_commercial', true);

        if (error) throw error;

        setProviders(data || []);
        calculateFilterCounts(data || []);
        applyFilters(data || [], filters);
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  // Calculate filter counts
  const calculateFilterCounts = (data: Provider[]) => {
    const counts: FilterCounts = {};
    Object.values(filterCategories).forEach((category) => {
      category.forEach((filter) => {
        counts[filter.key] = data.filter((p) => p[filter.key] === true).length;
      });
    });
    setFilterCounts(counts);
  };

  // Apply filters
  const applyFilters = (data: Provider[], filterState: any) => {
    let filtered = data;

    const allSelectedFilters = [
      ...filterState.sectors,
      ...filterState.methods,
      ...filterState.contracts,
      ...filterState.capabilities,
      ...filterState.credentials,
      ...filterState.certifications,
    ];

    if (allSelectedFilters.length > 0) {
      filtered = data.filter((provider) =>
        allSelectedFilters.every((filter) => provider[filter] === true)
      );
    }

    // Sort
    if (sortBy === 'quality') {
      filtered.sort((a, b) => {
        const scoreA = allSelectedFilters.length > 0 ? allSelectedFilters.filter(f => a[f] === true).length : (a.google_rating || 0);
        const scoreB = allSelectedFilters.length > 0 ? allSelectedFilters.filter(f => b[f] === true).length : (b.google_rating || 0);
        return scoreB - scoreA;
      });
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || a.provider_name).localeCompare(b.name || b.provider_name));
    }

    setFilteredProviders(filtered);
  };

  // Handle filter change
  const handleFilterChange = (filterKey: string, category: string) => {
    const newFilters = { ...filters };
    const categoryFilters = newFilters[category as keyof typeof filters] as string[];
    
    if (categoryFilters.includes(filterKey)) {
      newFilters[category as keyof typeof filters] = categoryFilters.filter(f => f !== filterKey) as any;
    } else {
      newFilters[category as keyof typeof filters] = [...categoryFilters, filterKey] as any;
    }
    
    setFilters(newFilters);
    applyFilters(providers, newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const emptyFilters = { sectors: [], methods: [], contracts: [], capabilities: [], credentials: [], certifications: [] };
    setFilters(emptyFilters);
    applyFilters(providers, emptyFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading commercial providers...</p>
        </div>
      </div>
    );
  }

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
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-6 py-2.5 font-medium text-base border-2 border-white/40 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-[#1e3a8a] text-white'
                      : 'bg-transparent text-white hover:border-white/60 hover:bg-white/10'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-96 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
        <Image
          src="/commercial-hero.jpg"
          alt="Commercial Pest Control"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-5xl font-black text-white mb-4">Commercial Pest Control Solutions</h1>
            <p className="text-xl text-blue-100">Professional pest management for businesses, facilities, and multi-site operations</p>
          </div>
        </div>
      </section>

      {/* SECTION 1: FEATURED PROVIDERS - 8 PROVIDERS, YELLOW BORDERS */}
      <section className="relative bg-gradient-to-br from-amber-50 to-white py-16 border-b-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Featured Commercial Providers</h2>
            <p className="text-lg text-gray-600">Top-rated commercial pest control providers with verified certifications</p>
          </div>

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
                  <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                    Featured
                  </div>

                  <h3 className="font-black text-base text-gray-900 mb-2 leading-tight line-clamp-2">
                    {provider.name || provider.provider_name}
                  </h3>

                  {provider.address && (
                    <div className="flex items-start gap-2 mb-3 text-xs text-gray-600">
                      <span className="text-red-500 mt-0.5">📍</span>
                      <span className="line-clamp-2">{provider.address}</span>
                    </div>
                  )}

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

      {/* SECTION 2: TOP RATED PROVIDERS */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 border-b-2 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Top Rated Commercial Providers</h2>
            <p className="text-lg text-gray-600">Providers with excellent ratings and proven track records</p>
          </div>

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
                  <div className="text-3xl mb-2">🏆</div>

                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-tight line-clamp-2">
                    {provider.name || provider.provider_name}
                  </h3>

                  {provider.address && (
                    <div className="flex items-start gap-1 mb-3 text-xs text-gray-600">
                      <span className="text-red-500 mt-0.5">📍</span>
                      <span className="line-clamp-1">{provider.address}</span>
                    </div>
                  )}

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

      {/* PDF GUIDES SECTION */}
      <section className="relative bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Commercial Pest Control Guides</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-l-4 border-blue-600 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Commercial Pest Control Guide</h3>
              <p className="text-gray-700 mb-6">Comprehensive guide to commercial pest control services, including best practices for facility management and compliance requirements.</p>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Get the Guide - £14.99
              </a>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 border-l-4 border-amber-600 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Multi-Site Pest Management Workbook</h3>
              <p className="text-gray-700 mb-6">Practical workbook for managing pest control across multiple locations with templates, checklists, and compliance frameworks.</p>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition">
                Get the Workbook - £23.99
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FULL PROVIDER LIST WITH FILTERS */}
      <section className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Full List of Commercial Providers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All {providers.length} commercial providers with advanced filtering
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* FILTER SIDEBAR */}
            <aside className="w-full lg:w-80 lg:flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24 border border-gray-100 max-h-[calc(100vh-7rem)] overflow-y-auto">
                
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  {(filters.sectors.length > 0 || filters.methods.length > 0 || filters.contracts.length > 0 || filters.capabilities.length > 0 || filters.credentials.length > 0 || filters.certifications.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Provider Count */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="text-3xl font-black text-blue-600">{filteredProviders.length}</div>
                  <div className="text-sm text-blue-700">Providers Found</div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Certifications</h4>
                  <div className="space-y-2">
                    {filterCategories.certifications.map(filter => (
                      <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.certifications.includes(filter.key)}
                          onChange={() => handleFilterChange(filter.key, 'certifications')}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                        <span className="text-xs text-gray-500">({filterCounts[filter.key] || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Methods */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Specialist Methods</h4>
                  <div className="space-y-2">
                    {filterCategories.methods.map(filter => (
                      <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.methods.includes(filter.key)}
                          onChange={() => handleFilterChange(filter.key, 'methods')}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                        <span className="text-xs text-gray-500">({filterCounts[filter.key] || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contracts */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Contract Options</h4>
                  <div className="space-y-2">
                    {filterCategories.contracts.map(filter => (
                      <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.contracts.includes(filter.key)}
                          onChange={() => handleFilterChange(filter.key, 'contracts')}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                        <span className="text-xs text-gray-500">({filterCounts[filter.key] || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sectors */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Commercial Sectors</h4>
                  <div className="space-y-2">
                    {filterCategories.sectors.map(filter => (
                      <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.sectors.includes(filter.key)}
                          onChange={() => handleFilterChange(filter.key, 'sectors')}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                        <span className="text-xs text-gray-500">({filterCounts[filter.key] || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Service Capabilities</h4>
                  <div className="space-y-2">
                    {filterCategories.capabilities.map(filter => (
                      <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.capabilities.includes(filter.key)}
                          onChange={() => handleFilterChange(filter.key, 'capabilities')}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                        <span className="text-xs text-gray-500">({filterCounts[filter.key] || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Credentials & Recognition</h4>
                  <div className="space-y-2">
                    {filterCategories.credentials.map(filter => (
                      <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.credentials.includes(filter.key)}
                          onChange={() => handleFilterChange(filter.key, 'credentials')}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                        <span className="text-xs text-gray-500">({filterCounts[filter.key] || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1">
              {filteredProviders.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 font-medium">
                      Showing {filteredProviders.length} of {providers.length} providers
                    </p>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        applyFilters(providers, filters);
                      }}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg font-medium text-gray-900"
                    >
                      <option value="quality">Sort by Quality Score</option>
                      <option value="name">Sort by Name</option>
                    </select>
                  </div>

                  {/* Provider Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProviders.map(provider => {
                      const isTrophy = provider.google_rating && provider.google_rating >= 4.5 && 
                                      provider.google_review_count && provider.google_review_count >= 30;
                      const borderClass = isTrophy ? 'border-l-4 border-amber-500' : 'border-l-4 border-[#1e3a8a]';

                      return (
                        <div key={provider.canonical_id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 ${borderClass}`}>
                          {isTrophy && <div className="text-2xl mb-2">🏆</div>}
                          <h3 className="font-bold text-base text-gray-900 mb-2 leading-tight line-clamp-2">
                            {provider.name || provider.provider_name}
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
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No providers match your selected filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
