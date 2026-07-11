import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--surface-base, #ECEFF4)] relative overflow-hidden">
      {/* Decorative ambient blurred circles to match the Nordic/Glass theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary, #5E81AC)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--accent-vibrant, #88C0D0)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#B48EAD] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="z-10 text-center max-w-lg mx-auto p-8">
        <div className="glass-panel p-12 rounded-3xl shadow-2xl border border-[var(--border-subtle, #D8DEE9)]"
             style={{ backgroundColor: 'rgba(236, 239, 244, 0.75)', backdropFilter: 'blur(20px)' }}>
          
          <h1 className="text-8xl font-black text-[var(--text-primary, #2E3440)] tracking-tighter mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-bold text-[var(--text-primary, #2E3440)] mb-4">
            Reality Not Found
          </h2>
          
          <p className="text-[var(--text-secondary, #4C566A)] mb-8 text-lg">
            The spatial coordinates you requested do not exist within the current Infinity Solution simulation. 
          </p>
          
          <Link href="/" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[var(--accent-primary, #5E81AC)] rounded-full hover:bg-[var(--text-primary, #2E3440)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Return to Base Reality
          </Link>
        </div>
      </div>
    </div>
  );
}
