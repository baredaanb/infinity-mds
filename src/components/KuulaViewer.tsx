"use client";

import React, { useState } from 'react';

interface KuulaViewerProps {
  tourId: string; // The Kuula tour ID, e.g., '79Z1L'
  title?: string;
}

export default function KuulaViewer({ tourId, title = "360° Virtual Tour" }: KuulaViewerProps) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="w-full h-[600px] md:h-[700px] relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] bg-[var(--surface-dark)] group">
      
      {!isInteractive && (
        <div 
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px] cursor-pointer transition-all hover:bg-black/20"
          onClick={() => setIsInteractive(true)}
        >
          <div className="glass-panel p-8 rounded-2xl text-center transform transition-transform group-hover:scale-105 duration-300">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <div className="inline-flex items-center justify-center px-8 py-4 bg-[var(--accent-primary)] text-white font-bold tracking-widest uppercase text-sm rounded-full shadow-lg">
              Explore Tour
            </div>
          </div>
        </div>
      )}

      {/* The iframe is loaded immediately but pointer-events are disabled until the user clicks to interact, preventing accidental scrolling hijack */}
      <iframe 
        className={`w-full h-full absolute inset-0 z-10 transition-opacity duration-700 ${isInteractive ? 'opacity-100 pointer-events-auto' : 'opacity-80 pointer-events-none'}`}
        src={`https://kuula.co/share/${tourId}?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1`}
        frameBorder="0" 
        allow="xr-spatial-tracking; gyroscope; accelerometer" 
        allowFullScreen 
        title={title}
      />
    </div>
  );
}
