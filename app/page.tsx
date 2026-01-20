'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Shield, TrendingUp, Home as HomeIcon, Building2, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: HEADER */}
      <header className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 bg-white rounded-full px-6 py-3" style={{width: '210px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              src="/logo-header.png"
              alt="PestPro Index"
              width={180}
              height={60}
              className="h-auto"
            />
          </Link>

          {/* Navigation tabs */}
          <nav className="flex gap-4">
            <Link href="/" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition">Home</Link>
            <Link href="/residential" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition">Residential</Link>
            <Link href="/commercial" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition">Commercial</Link>
            <Link href="/products" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition">Products</Link>
            <Link href="#" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition">About</Link>
            <Link href="#" className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition">Contact</Link>
          </nav>
        </div>
      </header>

      {/* SECTION 2: HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#1e293b] via-[#1e3a8a] to-[#2563eb] text-white py-32">
        {/* Layer 1: MUCH BRIGHTER center glow */}
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 800px 600px at center 20%, rgba(59, 130, 246, 0.5) 0%, transparent 60%)'}}></div>
        
        {/* Layer 2: MUCH DARKER edge vignette */}
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at center, transparent 20%, rgba(15, 23, 42, 0.85) 100%)'}}></div>
        
        {/* Layer 3: Additional darkening at very edges */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 100%)'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-9xl font-black tracking-tighter mb-4" style={{fontWeight: 900, letterSpacing: '-0.05em'}}>PestPro Index</h1>
          <p className="text-3xl font-light mb-8 tracking-widest">London's Neutral Pest Control Directory</p>
          <p className="text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Find certified pest control providers with transparent information. No endorsements, just evidence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-8">
            <div className="border-r border-white/30 pr-8">
              <div className="text-6xl font-black mb-2">481</div>
              <div className="text-sm font-semibold tracking-widest text-blue-100">RESIDENTIAL PROVIDERS</div>
            </div>
            <div className="border-r border-white/30 px-8">
              <div className="text-6xl font-black mb-2">457</div>
              <div className="text-sm font-semibold tracking-widest text-blue-100">COMMERCIAL PROVIDERS</div>
            </div>
            <div className="pl-8">
              <div className="text-6xl font-black mb-2">328</div>
              <div className="text-sm font-semibold tracking-widest text-blue-100">VERIFIED REVIEWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THREE CATEGORY CARDS (Two-tone design) */}
      <section className="bg-white py-16 relative z-10">
        <div className="container mx-auto px-4 -mt-36">
          <div className="grid grid-cols-3 gap-8 relative z-20">
            {/* Residential Card */}
            <div className="rounded-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{boxShadow: '0 50px 100px rgba(0, 0, 0, 0.85), 0 35px 70px rgba(0, 0, 0, 0.75), 0 20px 40px rgba(0, 0, 0, 0.65), 0 10px 20px rgba(0, 0, 0, 0.55)', cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 60px 120px rgba(0, 0, 0, 0.9), 0 40px 80px rgba(0, 0, 0, 0.85), 0 25px 50px rgba(0, 0, 0, 0.75), 0 12px 25px rgba(0, 0, 0, 0.65)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 0, 0, 0.85), 0 35px 70px rgba(0, 0, 0, 0.75), 0 20px 40px rgba(0, 0, 0, 0.65), 0 10px 20px rgba(0, 0, 0, 0.55)'}>
              {/* Blue top section */}
              <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-12 text-white text-center">
                <div className="w-16 h-16 bg-blue-400/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Residential</h3>
              </div>
              {/* White bottom section */}
              <div className="bg-white p-8 text-center">
                <p className="text-gray-700 mb-6">Find pest control for your home</p>
                <Link href="/residential" className="text-blue-600 font-semibold hover:text-blue-800">
                  Browse 481 providers →
                </Link>
              </div>
            </div>

            {/* Commercial Card */}
            <div className="rounded-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{boxShadow: '0 50px 100px rgba(0, 0, 0, 0.85), 0 35px 70px rgba(0, 0, 0, 0.75), 0 20px 40px rgba(0, 0, 0, 0.65), 0 10px 20px rgba(0, 0, 0, 0.55)', cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 60px 120px rgba(0, 0, 0, 0.9), 0 40px 80px rgba(0, 0, 0, 0.85), 0 25px 50px rgba(0, 0, 0, 0.75), 0 12px 25px rgba(0, 0, 0, 0.65)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 0, 0, 0.85), 0 35px 70px rgba(0, 0, 0, 0.75), 0 20px 40px rgba(0, 0, 0, 0.65), 0 10px 20px rgba(0, 0, 0, 0.55)'}>
              {/* Blue top section */}
              <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-12 text-white text-center">
                <div className="w-16 h-16 bg-blue-400/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Commercial</h3>
              </div>
              {/* White bottom section */}
              <div className="bg-white p-8 text-center">
                <p className="text-gray-700 mb-6">Find providers for your business</p>
                <Link href="/commercial" className="text-blue-600 font-semibold hover:text-blue-800">
                  Browse 457 providers →
                </Link>
              </div>
            </div>

            {/* Products Card */}
            <div className="rounded-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{boxShadow: '0 50px 100px rgba(0, 0, 0, 0.85), 0 35px 70px rgba(0, 0, 0, 0.75), 0 20px 40px rgba(0, 0, 0, 0.65), 0 10px 20px rgba(0, 0, 0, 0.55)', cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 60px 120px rgba(0, 0, 0, 0.9), 0 40px 80px rgba(0, 0, 0, 0.85), 0 25px 50px rgba(0, 0, 0, 0.75), 0 12px 25px rgba(0, 0, 0, 0.65)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 50px 100px rgba(0, 0, 0, 0.85), 0 35px 70px rgba(0, 0, 0, 0.75), 0 20px 40px rgba(0, 0, 0, 0.65), 0 10px 20px rgba(0, 0, 0, 0.55)'}>
              {/* Blue top section */}
              <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-12 text-white text-center">
                <div className="w-16 h-16 bg-blue-400/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Products</h3>
              </div>
              {/* White bottom section */}
              <div className="bg-white p-8 text-center">
                <p className="text-gray-700 mb-6">DIY pest control solutions</p>
                <Link href="/products" className="text-blue-600 font-semibold hover:text-blue-800">
                  Shop products →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg">A neutral directory designed for transparency, not transactions</p>
          </div>

          <div className="grid grid-cols-3 gap-12">
            {/* Search & Filter */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{background: 'linear-gradient(to bottom right, #2563eb, #1e40af)'}}>
                <Search className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Search & Filter</h3>
              <p className="text-gray-600">Filter by pest type, service features, and certifications to find the right match</p>
            </div>

            {/* Provider-Stated Info */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{background: 'linear-gradient(to bottom right, #2563eb, #1e40af)'}}>
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Provider-Stated Info</h3>
              <p className="text-gray-600">All information comes directly from providers - we don't judge outcomes</p>
            </div>

            {/* Make Informed Decisions */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{background: 'linear-gradient(to bottom right, #2563eb, #1e40af)'}}>
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Make Informed Decisions</h3>
              <p className="text-gray-600">Contact providers directly - no booking fees, no commissions, no bias</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRUST SECTION */}
      <section className="text-white py-20 text-center" style={{backgroundColor: '#a8a29e'}}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Our Commitment to Neutrality</h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            We source providers from BPCA and TrustMark directories. We preserve evidence, not opinions. No endorsements, no guarantees, no hidden agendas.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="bg-gray-500/50 px-6 py-3 rounded-full font-semibold">BPCA Sourced</div>
            <div className="bg-gray-500/50 px-6 py-3 rounded-full font-semibold">No Booking Fees</div>
            <div className="bg-gray-500/50 px-6 py-3 rounded-full font-semibold">Direct Contact</div>
            <div className="bg-gray-500/50 px-6 py-3 rounded-full font-semibold">Transparent Data</div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-12 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">PestPro Index</h4>
              <p className="text-sm">London's neutral pest control directory</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Disclaimer</h4>
              <p className="text-sm">We do not judge outcomes, we preserve evidence. No endorsements or guarantees.</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2025 PestPro Index. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
