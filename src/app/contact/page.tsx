import React from 'react';
import Link from 'next/link';
import ChatbotWidget from '@/components/ChatbotWidget';

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 7.1C2.6 6.3 3.3 5.6 4.1 5.5 5.8 5.2 12 5.2 12 5.2s6.2 0 7.9.3c.8.1 1.5.8 1.6 1.6.3 1.7.3 5.3.3 5.3s0 3.6-.3 5.3c-.1.8-.8 1.5-1.6 1.6-1.7.3-7.9.3-7.9.3s-6.2 0-7.9-.3c-.8-.1-1.5-.8-1.6-1.6C2 16 2 12.4 2 12.4s0-3.6.5-5.3z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

export default function Contact() {
  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)] font-sans overflow-x-hidden relative selection:bg-[var(--accent-primary)] selection:text-white">
      
      {/* Sleek Minimalist Header */}
      <header className="absolute top-0 w-full z-50 p-8 flex justify-between items-center bg-transparent">
        <Link href="/home" className="text-xl font-medium tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center">
            <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full"></div>
          </div>
          Infinity Solution
        </Link>
        <nav className="hidden md:flex gap-12 text-sm tracking-widest uppercase text-[var(--text-secondary)] font-medium">
          <Link href="/home" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Home</Link>
          <Link href="/portfolio" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Portfolio</Link>
          <Link href="/projects" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Projects</Link>
          <Link href="/home#services" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Services</Link>
          <Link href="/proposal.html" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-primary)] transition-colors duration-300">Proposal</Link>
          <Link href="/contact" className="text-[var(--accent-primary)] transition-colors duration-300">Contact</Link>
        </nav>
        <Link href="/contact" className="px-6 py-2 bg-[var(--accent-primary)] text-white rounded-none text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
          Book a Scan
        </Link>
      </header>

      <main className="flex flex-col w-full pt-32">
        <section className="w-full pb-32 bg-[var(--surface-base)] relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            
            {/* Left: Contact Info */}
            <div className="flex flex-col justify-center">
              <div className="inline-block px-4 py-1 border border-[var(--accent-primary)] text-[var(--accent-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-6 self-start">
                Get In Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Contact Us</h1>
              <div className="w-12 h-[1px] bg-[var(--accent-primary)] mb-8"></div>
              
              <div className="space-y-6 text-[var(--text-secondary)] font-light leading-relaxed mb-12 text-lg">
                <p>
                  <strong className="text-[var(--text-primary)] text-xl font-normal tracking-wider block mb-2">Infinity Solution</strong>
                  Ward No. 1, H. No. 2, Bank Colony<br/>
                  Nahar Sayyed Road<br/>
                  Mandsaur - 458001
                </p>
                <p>
                  <strong className="text-[var(--text-primary)] font-medium tracking-wide">Contact No:</strong> +91 9826299324<br/>
                  <strong className="text-[var(--text-primary)] font-medium tracking-wide">Email:</strong> solinfi21@gmail.com
                </p>
              </div>

              {/* Social Icons (LIC Style Squircles) */}
              <div className="flex gap-4">
                {/* WhatsApp */}
                <a href="https://api.whatsapp.com/send?phone=919826299324" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:scale-110 hover:shadow-[0_0_15px_#25D366] transition-all duration-300">
                  <WhatsappIcon className="w-5 h-5" />
                </a>
                {/* X (Twitter) */}
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-black border border-white/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300">
                  <XIcon className="w-4 h-4" />
                </a>
                {/* Instagram */}
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:scale-110 hover:shadow-[0_0_15px_#dc2743] transition-all duration-300">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                {/* Facebook */}
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-[#1877F2] hover:scale-110 hover:shadow-[0_0_15px_#1877F2] transition-all duration-300">
                  <FacebookIcon className="w-5 h-5" />
                </a>
                {/* YouTube */}
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-[#FF0000] hover:scale-110 hover:shadow-[0_0_15px_#FF0000] transition-all duration-300">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="glass-panel p-8 md:p-12 border border-[var(--border-subtle)] relative rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-light mb-8 text-[var(--text-primary)]">Send an Inquiry</h3>
              <form className="flex flex-col gap-6">
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--accent-primary)] px-0 py-3 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-secondary)]" />
                <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--accent-primary)] px-0 py-3 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-secondary)]" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--accent-primary)] px-0 py-3 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-secondary)]" />
                <textarea placeholder="How can we help you?" rows={4} className="w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--accent-primary)] px-0 py-3 outline-none text-[var(--text-primary)] transition-colors resize-none placeholder:text-[var(--text-secondary)]"></textarea>
                <button type="button" className="mt-4 w-full py-4 bg-[var(--accent-primary)] text-white font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 rounded shadow-lg hover:shadow-xl">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

          {/* Bottom: Google Maps */}
          <div className="max-w-7xl mx-auto mt-16 px-6 relative z-10">
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] relative group">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=24.082689616851404,75.06356974259+(Infinity%20Solution)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 w-full h-full pointer-events-none"
              ></iframe>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=24.082689616851404,+75.06356974259" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
              >
                <div className="bg-[var(--accent-primary)] text-white px-6 py-3 rounded-full font-medium tracking-widest uppercase text-sm shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Get Directions
                </div>
              </a>
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
