"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, X, Monitor, Smartphone, Globe } from 'lucide-react';

const PROJECTS = [
  {
    name: 'Parshwnath Store',
    category: 'Retail & E-commerce',
    description: 'A complete digital transformation featuring a fully interactive 360° virtual showroom and integrated e-commerce product tags to drive remote sales.',
    presentation: {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
      type: 'Web Application',
      techStack: ['Next.js', 'React 360', 'Shopify API', 'Tailwind CSS'],
      results: 'Increased remote conversions by 45% within the first quarter.',
    }
  },
  {
    name: 'Personality Boutique',
    category: 'Fashion & Apparel',
    description: 'High-end fashion meets immersive digital experience. We captured the luxurious ambiance of this boutique, allowing customers to browse collections virtually.',
    presentation: {
      image: '/cloth_boutique.png',
      type: 'Interactive E-Commerce',
      techStack: ['React', 'Three.js', 'Framer Motion'],
      results: 'Boosted average session duration by over 3 minutes.',
    }
  },
  {
    name: 'Aryrakshit Mandir',
    category: 'Management Web App',
    description: 'A comprehensive Mandir management web application designed to maintain, organize, and process all daily activities, donations, and administrative tasks.',
    presentation: {
      image: '/jain_mandir.png',
      type: 'Administrative Portal',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      results: 'Streamlined all administrative acts and donation processing.',
    }
  },
  {
    name: 'Global Gym',
    category: 'Fitness & Health',
    description: 'An energetic, interactive tour showcasing state-of-the-art fitness equipment and premium training spaces to drive local membership sign-ups.',
    presentation: {
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      type: 'Lead Generation Site',
      techStack: ['Next.js', 'Google Maps API', 'Stripe'],
      results: '20% increase in local membership signups.',
    }
  },
  {
    name: 'PhotoEye',
    category: 'Photography CRM & SaaS',
    description: 'An AI-powered photography management platform featuring automated face-recognition for client photo selection, studio CRM, and digital album flipbooks.',
    presentation: {
      image: '/photoeye_crm.png',
      type: 'Studio Management SaaS',
      techStack: ['React', 'Node.js', 'Python AI', 'AWS S3'],
      results: 'Streamlined client photo selection time by 80%.',
    }
  },
  {
    name: 'The Barber',
    category: 'Grooming & Salon',
    description: 'A stylish, classic virtual walkthrough of a premium barbershop, perfectly capturing the atmosphere and aesthetic to attract new clients.',
    presentation: {
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop',
      type: 'Booking Web App',
      techStack: ['Next.js', 'Calendly API', 'Tailwind CSS'],
      results: 'Fully automated the salon booking process.',
    }
  },
  {
    name: 'Medicine Hub',
    category: 'Healthcare & Pharmacy',
    description: 'A highly organized digital storefront and complete Google Business Profile optimization for a trusted, fast-growing local pharmacy.',
    presentation: {
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop',
      type: 'Google Business Integration',
      techStack: ['Google API', 'Local SEO', 'React'],
      results: 'Ranked #1 on Google Maps for local area searches.',
    }
  },
  {
    name: 'Wheel On Rent',
    category: 'Ride-Hailing Mobile App',
    description: 'A robust on-demand vehicle booking and ride-hailing mobile application, featuring real-time driver tracking, dynamic pricing, and seamless payment integration.',
    presentation: {
      image: '/ride_hailing_app.png',
      type: 'Native Mobile Application',
      techStack: ['React Native', 'Google Maps API', 'Node.js', 'Socket.io'],
      results: 'Successfully facilitated over 5,000 daily active rides in the target region.',
    }
  }
];

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <>
      <section id="projects" className="py-24 w-full relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1 border border-[var(--accent-primary)] text-[var(--accent-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Our Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--text-primary)]">
              Featured <span className="font-serif italic text-[var(--text-secondary)]">Projects</span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
            Explore how we've helped diverse businesses across retail, healthcare, and hospitality transform their physical spaces into powerful digital assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-6 flex flex-col justify-between h-[320px] hover:shadow-xl hover:border-[var(--accent-primary)] transition-all duration-500"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-dark)] flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-tertiary)] bg-[var(--surface-base)] px-3 py-1 rounded-full border border-[var(--border-subtle)] text-center max-w-[120px] truncate">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                <span>View Presentation</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Presentation Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[var(--surface-base)] rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden border border-[var(--border-subtle)] z-10 flex flex-col lg:flex-row"
            >
              {/* Left Side: Mockup Image */}
              <div 
                className="w-full lg:w-1/2 h-64 lg:h-auto bg-cover bg-center relative"
                style={{ backgroundImage: `url(${activeProject.presentation.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r" />
                <button 
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors lg:hidden"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Right Side: Content */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button 
                  onClick={() => setActiveProject(null)}
                  className="absolute top-8 right-8 p-2 rounded-full hover:bg-black/5 text-[var(--text-secondary)] transition-colors hidden lg:block"
                >
                  <X size={24} />
                </button>

                <div className="inline-block px-4 py-1 border border-[var(--accent-primary)] text-[var(--accent-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-6 w-fit rounded-full">
                  {activeProject.category}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--text-primary)] mb-6">
                  {activeProject.name}
                </h3>
                
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                  {activeProject.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold mb-3">
                      <Monitor size={18} className="text-[var(--accent-primary)]" />
                      Platform Type
                    </div>
                    <div className="text-[var(--text-secondary)] text-sm">{activeProject.presentation.type}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold mb-3">
                      <Globe size={18} className="text-[var(--accent-primary)]" />
                      Business Impact
                    </div>
                    <div className="text-[var(--text-secondary)] text-sm">{activeProject.presentation.results}</div>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="text-sm font-bold tracking-widest uppercase text-[var(--text-tertiary)] mb-4">Tech Stack Utilized</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.presentation.techStack.map(tech => (
                      <span key={tech} className="px-4 py-2 rounded-full text-xs font-medium bg-[var(--surface-dark)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--border-subtle)]">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[var(--accent-primary)] text-white font-bold tracking-wider uppercase rounded-xl hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-3">
                    <Smartphone size={18} />
                    View Live Deployment
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
