import React from 'react';
import Link from 'next/link';
import BundleBuilder from '@/components/BundleBuilder';
import ChatbotWidget from '@/components/ChatbotWidget';
import KuulaViewer from '@/components/KuulaViewer';
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)] font-sans overflow-x-hidden relative selection:bg-[var(--accent-primary)] selection:text-white">
      
      {/* Sleek Minimalist Header */}
      <header className="absolute top-0 w-full z-50 p-8 flex justify-between items-center bg-transparent">
        <div className="text-xl font-medium tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center">
            <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full"></div>
          </div>
          Infinity Solution
        </div>
        <nav className="hidden md:flex gap-12 text-sm tracking-widest uppercase text-[var(--text-secondary)] font-medium">
          <Link href="/home" className="text-[var(--accent-primary)] transition-colors duration-300">Home</Link>
          <Link href="/portfolio" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Portfolio</Link>
          <Link href="/projects" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Projects</Link>
          <Link href="#services" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Services</Link>
          <Link href="/proposal.html" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Proposal</Link>
          <Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Contact</Link>
        </nav>
        <Link href="/contact" className="px-6 py-2 bg-[var(--text-primary)] text-white rounded-none text-sm tracking-widest uppercase hover:bg-[var(--accent-primary)] transition-all duration-500">
          Book a Scan
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-col w-full">
        
        {/* Section 1: Hero (Focus on 360 Tours) */}
        <section className="w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between p-6 pt-32 lg:pt-40 max-w-7xl mx-auto gap-12">
          
          {/* Left: Copywriting */}
          <div className="flex-1 flex flex-col items-start z-10 w-full">
            <div className="inline-block px-4 py-1 border border-[var(--accent-primary)] text-[var(--accent-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Immersive Real Estate & Retail
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1] text-glow">
              Step Inside Your <br/> 
              <span className="font-serif italic text-[var(--text-secondary)] text-4xl md:text-6xl">Business Reality</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl font-light leading-relaxed mb-12">
              Elevate your online presence with stunning, interactive 360° virtual tours. We bring physical spaces to the digital world, increasing engagement, trust, and sales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <Link href="#showcase" className="px-8 py-4 bg-[var(--accent-primary)] text-white text-sm tracking-[0.2em] uppercase font-bold text-center hover:bg-[var(--text-primary)] transition-colors duration-300 shadow-xl">
                 View Showcase
              </Link>
            </div>
          </div>
          
          {/* Right: Interactive 360 Viewer */}
          <div id="showcase" className="flex-1 w-full lg:w-auto relative z-10">
            {/* Ambient shadow/glow for the viewer */}
            <div className="absolute inset-0 bg-[var(--accent-primary)] blur-[100px] opacity-10 transform scale-90 translate-y-8"></div>
            
            {/* We use a sample Kuula tour ID here. The client can swap this out with their own Kuula IDs easily. */}
            <KuulaViewer tourId="79Z1L" title="Sample Enterprise Tour" />
          </div>
          
        </section>

        {/* Section 2: Services / Bundle Builder */}
        <section id="services" className="w-full py-32 bg-white border-t border-[var(--border-subtle)] mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">Our Services</h2>
              <div className="w-12 h-[1px] bg-[var(--accent-primary)] mx-auto mb-6"></div>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light">
                Configure a custom 360° capture package tailored to your property size and interactive requirements.
              </p>
            </div>
            
            <div className="glass-panel rounded-2xl p-4 border-[var(--border-subtle)]">
              <BundleBuilder />
            </div>
          </div>
        </section>
        


      </main>

      {/* Footer */}
      <footer className="w-full py-16 text-center text-[var(--text-secondary)] border-t border-[var(--border-subtle)] bg-[var(--surface-base)]">
        <div className="text-2xl font-serif italic mb-6">Infinity Solution</div>
        <p className="text-sm tracking-widest uppercase">&copy; {new Date().getFullYear()} Infinity Solution. All realities reserved.</p>
      </footer>

      {/* Global AI Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
