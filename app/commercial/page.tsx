'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const supabase = createClient();

interface Provider {
  canonical_id: number;
  name: string;
  website: string | null;
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

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/residential', label: 'Residential' },
    { href: '/commercial', label: 'Commercial' },
    { href: '/professionals', label: 'Professionals' },
    { href: '/products', label: 'Home Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-md border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-black text-[#1e3a8a]">
              PestPro Index
            </Link>
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-semibold transition ${
                    pathname === item.href
                      ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a]'
                      : 'text-gray-600 hover:text-[#1e3a8a]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Find Your Commercial Pest Control Provider
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Browse {filteredProviders.length} verified commercial pest control providers. Filter by sectors, services, and capabilities to find the perfect match for your business.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
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
                    // Find the filter label
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Loading...' : `Showing ${filteredProviders.length} of 431 providers`}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.canonical_id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-600"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>
                    {provider.website && (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
                      >
                        Visit Website →
                      </a>
                    )}
                    <p className="text-gray-600 text-sm mb-4">
                      ID: {provider.canonical_id}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
