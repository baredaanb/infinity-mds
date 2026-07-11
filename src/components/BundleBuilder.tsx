"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, X, Info } from 'lucide-react';

const SERVICES = [
  { 
    id: 'basic_tour', 
    name: '360° Virtual Tour', 
    price: '₹₹',
    modalTitle: '360° Virtual Tour Ecosystem',
    modalDescription: 'Our comprehensive 360° virtual tour packages offer a suite of powerful features designed to fully immerse your clients:',
    modalFeatures: [
      '360° Virtual Tour',
      'Custom Interactive Hotspots',
      'E-commerce Product Tags',
      'Google Street View Integration',
      'Drone 360° Aerial View'
    ]
  },
  { 
    id: 'data_analytics', 
    name: 'Data Analytics', 
    price: '₹₹₹',
    modalTitle: 'Advanced Data Analytics',
    modalDescription: 'Transform raw numbers into actionable business intelligence with our enterprise-grade data pipelines.',
    modalFeatures: [
      'Real-time Custom Dashboarding',
      'Predictive User Modeling',
      'Conversion Funnel Analysis',
      'Custom KPI Tracking & Alerting',
      'Automated Weekly Data Reporting'
    ]
  },
  { 
    id: 'web_dev', 
    name: 'Website Development', 
    price: '₹₹₹',
    modalTitle: 'Enterprise Website Development',
    modalDescription: 'High-performance, scalable web platforms built with cutting-edge technologies that drive conversions.',
    modalFeatures: [
      'Bespoke UI/UX Design',
      'Blazing Fast Load Times (Core Web Vitals)',
      'Fully Responsive Mobile-First Layouts',
      'Headless CMS Integration',
      'Technical SEO Foundation'
    ]
  },
  { 
    id: 'app_dev', 
    name: 'App Development', 
    price: '₹₹₹₹',
    modalTitle: 'Cross-Platform App Development',
    modalDescription: 'Reach your customers anywhere with robust iOS and Android applications built from a unified architecture.',
    modalFeatures: [
      'React Native / Expo Frameworks',
      'Native Device Features (Camera, GPS, etc.)',
      'Targeted Push Notification Campaigns',
      'End-to-End App Store Deployment',
      'Offline Mode & Data Syncing'
    ]
  },
  { 
    id: 'android_dev', 
    name: 'Android Development', 
    price: '₹₹₹₹',
    modalTitle: 'Native Android Development',
    modalDescription: 'Deep, performant, native applications built specifically for the Google Play Store ecosystem.',
    modalFeatures: [
      'Kotlin & Jetpack Compose',
      'Material Design 3 Guidelines',
      'Deep Android Hardware Access',
      'Advanced Memory & Battery Management',
      'Google Play Store Optimization (ASO)'
    ]
  },
  { 
    id: 'seo', 
    name: 'SEO Optimization', 
    price: '₹₹',
    modalTitle: 'Full-Spectrum SEO Optimization',
    modalDescription: 'Dominate search rankings and drive organic, high-intent traffic directly to your business.',
    modalFeatures: [
      'Comprehensive Keyword & Competitor Research',
      'On-Page & Technical Code SEO',
      'High-Authority Backlink Building',
      'Content Gap Analysis',
      'Local SEO Ranking Strategies'
    ]
  },
  { 
    id: 'gmb', 
    name: 'Google Business Profile', 
    price: '₹',
    modalTitle: 'Google Business Profile Mastery',
    modalDescription: 'Turn local searchers into physical foot traffic with a highly-optimized Google Business Profile.',
    modalFeatures: [
      'Complete Profile Setup & Verification',
      '360° Virtual Tour Google Maps Integration',
      'Local SEO & Category Optimization',
      'Review Management & Response Strategy',
      'Weekly Post & Update Automation'
    ]
  }
];

export default function BundleBuilder() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedServices.includes(id);

  const activeServiceData = SERVICES.find(s => s.id === activeModalId);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-6 md:p-10 glass-panel rounded-3xl relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Build Your Growth Bundle</h2>
          <p className="text-[var(--text-secondary)]">
            Combine services to unlock synergistic growth and optimized retainers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleService(service.id)}
              className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 flex flex-col justify-between h-28 ${
                isSelected(service.id) 
                  ? 'bg-[var(--accent-primary)] hairline-border shadow-md text-white' 
                  : 'bg-[var(--surface-elevated)] hairline-border hover:border-[var(--accent-vibrant)] text-[var(--text-primary)]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold leading-tight pr-2">{service.name}</span>
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected(service.id) ? 'bg-white text-[var(--accent-primary)]' : 'bg-[var(--surface-base)] text-[var(--text-secondary)]'
                }`}>
                  {isSelected(service.id) ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                {/* Dynamic More Info Link for all tabs */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveModalId(service.id); }}
                  className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline w-fit ${
                    isSelected(service.id) ? 'text-white' : 'text-[var(--accent-primary)]'
                  }`}
                >
                  <Info size={12} /> More Info
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          layout
          className="pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div>
            <h3 className="font-medium text-[var(--text-primary)]">
              {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected
            </h3>
            {selectedServices.length > 1 && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[var(--accent-primary)] mt-1 font-semibold"
              >
                ✨ Bundle synergies unlocked
              </motion.p>
            )}
          </div>
          
          <button 
            disabled={selectedServices.length === 0}
            className="px-8 py-3 rounded-full bg-[var(--text-primary)] text-[var(--surface-base)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-md w-full md:w-auto"
          >
            Request Custom Proposal
          </button>
        </motion.div>
      </div>

      {/* Dynamic Information Modal Popup */}
      <AnimatePresence>
        {activeServiceData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[var(--border-subtle)] z-10"
            >
              <div className="p-6 bg-[var(--surface-dark)] border-b border-[var(--border-subtle)] flex justify-between items-center">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{activeServiceData.modalTitle}</h3>
                <button 
                  onClick={() => setActiveModalId(null)}
                  className="p-2 rounded-full hover:bg-black/5 text-[var(--text-secondary)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {activeServiceData.modalDescription}
                </p>
                <ul className="space-y-4">
                  {activeServiceData.modalFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-[var(--accent-primary)] shrink-0" />
                      <span className="font-medium text-[var(--text-primary)]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-[var(--surface-base)] p-4 rounded-xl border border-[var(--border-subtle)]">
                    <span className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Estimated Engagement</span>
                    <span className="text-xl font-bold text-[var(--accent-primary)] tracking-widest">{activeServiceData.price}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (!isSelected(activeServiceData.id)) toggleService(activeServiceData.id);
                      setActiveModalId(null);
                    }}
                    className={`w-full py-3 font-bold rounded-xl transition-all shadow-md ${
                      isSelected(activeServiceData.id) 
                        ? 'bg-[var(--surface-dark)] text-[var(--text-primary)] border border-[var(--border-subtle)]' 
                        : 'bg-[var(--accent-primary)] text-white hover:opacity-90'
                    }`}
                  >
                    {isSelected(activeServiceData.id) ? 'Added to Bundle (Close)' : 'Add to Bundle'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
