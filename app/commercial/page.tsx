'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import Link from 'next/link';
import { Star, Award, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, ChevronDown, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const supabase = createClient();

interface Provider {
  canonical_id: number;
  name: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  bpca_member: boolean;
  npta_member: boolean;
  basis_prompt_member: boolean;
  reviews_count: number;
  reviews_avg_rating: number | null;
  [key: string]: any;
}

export default function CommercialPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['sectors']));
  const pathname = usePathname();

  // Define filter categories with all 38 commercial filters
  const filterCategories = {
    sectors: {
      label: 'Commercial Sectors',
      filters: [
        { key: 'property_management', label: 'Property Management' },
        { key: 'social_housing', label: 'Social Housing' },
        { key: 'hospitality', label: 'Hospitality' },
        { key: 'healthcare', label: 'Healthcare' },
        { key: 'education', label: 'Education' },
        { key: 'retail', label: 'Retail' },
        { key: 'food_production', label: 'Food Production' },
        { key: 'warehousing_logistics', label: 'Warehousing & Logistics' },
        { key: 'offices', label: 'Offices' },
        { key: 'leisure_facilities', label: 'Leisure Facilities' },
      ],
    },
    specialist: {
      label: 'Specialist Methods',
      filters: [
        { key: 'heat_treatment', label: 'Heat Treatment' },
        { key: 'falconry_bird_control', label: 'Falconry Bird Control' },
        { key: 'detection_dogs', label: 'Detection Dogs' },
        { key: 'high_rise_rope_access', label: 'High Rise Rope Access' },
        { key: 'fumigation', label: 'Fumigation' },
        { key: 'proofing_services', label: 'Proofing Services' },
      ],
    },
    contracts: {
      label: 'Contract Options',
      filters: [
        { key: 'flexible_contracts', label: 'Flexible Contracts' },
        { key: 'no_tie_in_contracts', label: 'No Tie-In Contracts' },
        { key: 'retainer_services', label: 'Retainer Services' },
        { key: 'one_off_services', label: 'One-Off Services' },
        { key: 'emergency_24_7', label: 'Emergency 24/7' },
      ],
    },
    capabilities: {
      label: 'Service Capabilities',
      filters: [
        { key: 'multi_site_coverage', label: 'Multi-Site Coverage' },
        { key: 'national_coverage', label: 'National Coverage' },
        { key: 'unmarked_vehicles', label: 'Unmarked Vehicles' },
        { key: 'non_disruptive_services', label: 'Non-Disruptive Services' },
        { key: 'out_of_hours_services', label: 'Out of Hours Services' },
        { key: 'same_day_service', label: 'Same Day Service' },
      ],
    },
    credentials: {
      label: 'Credentials & Certifications',
      filters: [
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
    },
  };

  // Load all providers on mount
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const { data, error } = await supabase
          .from('Providers')
          .select('*')
          .limit(500);

        if (error) throw error;
        setProviders(data || []);
        setFilteredProviders(data || []);
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  // Filter providers based on selected filters
  useEffect(() => {
    if (selectedFilters.size === 0) {
      setFilteredProviders(providers);
      return;
    }

    const filtered = providers.filter((provider) => {
      // OR logic: provider must match at least one selected filter
      return Array.from(selectedFilters).some((filterKey) => {
        return provider[filterKey] === true;
      });
    });

    setFilteredProviders(filtered);
  }, [selectedFilters, providers]);

  const toggleFilter = (filterKey: string) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(filterKey)) {
      newFilters.delete(filterKey);
    } else {
      newFilters.add(filterKey);
    }
    setSelectedFilters(newFilters);
  };

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const clearAllFilters = () => {
    setSelectedFilters(new Set());
  };

  // Get featured providers (top 3 by review count)
  const featuredProviders = [...filteredProviders]
    .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))
    .slice(0, 3);

  // Get most certified providers (top 8 by certification count)
  const mostCertifiedProviders = [...filteredProviders]
    .map((provider) => {
      let certCount = 0;
      if (provider.bpca_member) certCount++;
      if (provider.npta_member) certCount++;
      if (provider.basis_prompt_member) certCount++;
      return { ...provider, certCount };
    })
    .filter((p) => p.certCount > 0)
    .sort((a, b) => b.certCount - a.certCount)
    .slice(0, 8);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/residential', label: 'Residential' },
    { href: '/commercial', label: 'Commercial' },
    { href: '/professionals', label: 'Professionals' },
    { href: '/products', label: 'Home Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0f172a] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo-header.png" alt="PestPro Index" className="h-12" />
              <span className="text-xl font-black text-white">PestPro Index</span>
            </Link>
            <div className="hidden md:flex gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    pathname === item.href
                      ? 'bg-[#1e3a8a] text-white'
                      : 'bg-[#1e3a8a] text-white hover:bg-blue-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/kitchen-cleaning.png)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Commercial Pest Control
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-4">
            457 Verified Providers in London
          </p>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Filter by sectors, services, and capabilities to find the perfect match for your business. No endorsements, no commissions—just transparent, provider-stated information.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {selectedFilters.size > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Filter Categories */}
              {Object.entries(filterCategories).map(([categoryKey, category]) => (
                <div key={categoryKey} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="w-full flex items-center justify-between mb-4 hover:text-blue-600 transition"
                  >
                    <h3 className="font-semibold text-gray-900">{category.label}</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        expandedCategories.has(categoryKey) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedCategories.has(categoryKey) && (
                    <div className="space-y-3">
                      {category.filters.map((filter) => (
                        <label key={filter.key} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.has(filter.key)}
                            onChange={() => toggleFilter(filter.key)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 hover:text-gray-900">
                            {filter.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Active Filters Display */}
            {selectedFilters.size > 0 && (
              <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Active Filters ({selectedFilters.size}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedFilters).map((filterKey) => {
                    let label = '';
                    for (const category of Object.values(filterCategories)) {
                      const found = category.filters.find((f) => f.key === filterKey);
                      if (found) {
                        label = found.label;
                        break;
                      }
                    }
                    return (
                      <div
                        key={filterKey}
                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {label}
                        <button
                          onClick={() => toggleFilter(filterKey)}
                          className="hover:bg-blue-700 rounded-full p-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900">
                {loading ? 'Loading...' : `Showing ${filteredProviders.length} Providers`}
              </h2>
            </div>

            {/* Provider Cards */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading providers...</p>
              </div>
            ) : filteredProviders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">
                  No providers match your selected filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Clear filters to see all providers
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.canonical_id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-l-4 border-blue-600 p-6"
                  >
                    {/* Provider Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                          {provider.name}
                        </h3>
                        {provider.reviews_count > 0 && (
                          <div className="flex items-center gap-3 mb-3">
                            {renderStars(provider.reviews_avg_rating)}
                            <span className="text-sm font-semibold text-gray-600">
                              {provider.reviews_avg_rating?.toFixed(1)} ({provider.reviews_count}{' '}
                              {provider.reviews_count === 1 ? 'review' : 'reviews'})
                            </span>
                          </div>
                        )}
                      </div>
                      {provider.website && (
                        <Link
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                          Visit Website →
                        </Link>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {provider.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-blue-600" />
                          <span className="text-sm text-gray-700">{provider.phone}</span>
                        </div>
                      )}
                      {provider.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-blue-600" />
                          <span className="text-sm text-gray-700">{provider.email}</span>
                        </div>
                      )}
                      {provider.address && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-blue-600" />
                          <span className="text-sm text-gray-700">{provider.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Certification Badges */}
                    {(provider.bpca_member || provider.npta_member || provider.basis_prompt_member) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.bpca_member && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                            <ShieldCheck size={14} />
                            BPCA Member
                          </span>
                        )}
                        {provider.npta_member && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                            <Award size={14} />
                            NPTA Member
                          </span>
                        )}
                        {provider.basis_prompt_member && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                            <CheckCircle2 size={14} />
                            BASIS PROMPT
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FEATURED PROVIDERS SECTION */}
      {featuredProviders.length > 0 && (
        <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 border-t-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Featured Providers
              </h2>
              <p className="text-lg text-gray-600">
                Top-reviewed commercial pest control providers in London
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.canonical_id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 border-yellow-500 p-6"
                >
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {provider.name}
                  </h3>
                  {provider.reviews_count > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      {renderStars(provider.reviews_avg_rating)}
                      <span className="text-sm font-semibold text-gray-600">
                        {provider.reviews_avg_rating?.toFixed(1)} ({provider.reviews_count}{' '}
                        {provider.reviews_count === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  )}
                  {provider.website && (
                    <Link
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      Visit Website →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MOST CERTIFIED PROVIDERS SECTION */}
      {mostCertifiedProviders.length > 0 && (
        <section className="relative bg-gradient-to-br from-white to-gray-50 py-16 border-t-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Most Certified Providers
              </h2>
              <p className="text-lg text-gray-600">
                Providers with the most industry certifications and memberships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {mostCertifiedProviders.map((provider) => (
                <div
                  key={provider.canonical_id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-600 p-6"
                >
                  <div className="text-3xl font-black text-blue-600 mb-2">
                    🏅 {provider.certCount}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-4">
                    {provider.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {provider.bpca_member && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-blue-600" />
                        <span className="text-xs text-gray-700">BPCA Member</span>
                      </div>
                    )}
                    {provider.npta_member && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-xs text-gray-700">NPTA Member</span>
                      </div>
                    )}
                    {provider.basis_prompt_member && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-purple-600" />
                        <span className="text-xs text-gray-700">BASIS PROMPT</span>
                      </div>
                    )}
                  </div>
                  {provider.website && (
                    <Link
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-3 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-xs"
                    >
                      Visit Website →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PDF GUIDES SECTION - TWO GUIDES SIDE-BY-SIDE */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 border-t-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Essential Guides for Commercial Pest Control
            </h2>
            <p className="text-lg text-gray-600">
              Expert resources to help you select the right provider and maintain compliance
            </p>
          </div>

          {/* Two Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* LEFT GUIDE */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#1e3a8a]">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Commercial Provider Selection Guide
                </h3>
                <p className="text-sm font-semibold text-[#2563eb] mb-3">For Property Managers</p>
                <p className="text-3xl font-black text-[#f59e0b] mb-4">£14.99</p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Step-by-step guide to selecting the right commercial pest control provider for multi-unit properties and commercial portfolios.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">•</span>
                  <p className="text-gray-700">Certification requirements to look for</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">•</span>
                  <p className="text-gray-700">Contract evaluation frameworks</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">•</span>
                  <p className="text-gray-700">RFP templates and checklists</p>
                </div>
              </div>
              
              <Link 
                href="https://pestproindex.lemonsqueezy.com/checkout/buy/8d8b4f4a-a913-48b3-bf8d-dfcaf6fcb5d6"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 bg-[#1e3a8a] text-white font-bold rounded-lg hover:bg-blue-900 transition-all shadow-md"
              >
                Get the Guide - £14.99
              </Link>
            </div>

            {/* RIGHT GUIDE */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#f59e0b]">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Compliance Workbook
                </h3>
                <p className="text-sm font-semibold text-[#2563eb] mb-3">For Small Business Owners</p>
                <p className="text-3xl font-black text-[#f59e0b] mb-4">£29.99</p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Essential compliance requirements for commercial pest control in London.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">•</span>
                  <p className="text-gray-700">Regulatory compliance checklist</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">•</span>
                  <p className="text-gray-700">Documentation templates</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">•</span>
                  <p className="text-gray-700">Audit preparation guide</p>
                </div>
              </div>
              
              <Link 
                href="https://pestproindex.lemonsqueezy.com/checkout/buy/8d8b4f4a-a913-48b3-bf8d-dfcaf6fcb5d6"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 bg-[#1e3a8a] text-white font-bold rounded-lg hover:bg-blue-900 transition-all shadow-md"
              >
                Get the Workbook - £29.99
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 PestPro Index. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
