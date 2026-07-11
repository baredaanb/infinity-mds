import React from 'react';
import Link from 'next/link';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ChatbotWidget from '@/components/ChatbotWidget';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)] font-sans overflow-x-hidden relative selection:bg-[var(--accent-primary)] selection:text-white">
      
      {/* Sleek Minimalist Header */}
      <header className="absolute top-0 w-full z-50 p-8 flex justify-between items-center bg-transparent">
        <Link href="/" className="text-xl font-medium tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center">
            <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full"></div>
          </div>
          Infinity Solution
        </Link>
        <nav className="hidden md:flex gap-12 text-sm tracking-widest uppercase text-[var(--text-secondary)] font-medium">
          <Link href="/projects" className="text-[var(--accent-primary)] transition-colors duration-300">Projects</Link>
          <Link href="/#showcase" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Tours</Link>
          <Link href="/#services" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Services</Link>
          <Link href="/proposal.html" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Proposal</Link>
          <Link href="/#contact" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Contact</Link>
        </nav>
        <Link href="/#contact" className="px-6 py-2 bg-[var(--text-primary)] text-white rounded-none text-sm tracking-widest uppercase hover:bg-[var(--accent-primary)] transition-all duration-500">
          Book a Scan
        </Link>
      </header>

      {/* Main Content with padding to clear absolute header */}
      <main className="flex flex-col w-full pt-20">
        <ProjectsShowcase />
      </main>

      {/* Footer */}
      <footer className="w-full py-16 text-center text-[var(--text-secondary)] border-t border-[var(--border-subtle)] bg-[var(--surface-base)]">
        <div className="text-2xl font-serif italic mb-6">Infinity Solution</div>
        <p className="text-sm tracking-widest uppercase">&copy; {new Date().getFullYear()} Infinity Solution. All realities reserved.</p>
      </footer>

      <ChatbotWidget />
    </div>
  );
}
