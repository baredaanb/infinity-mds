import React from 'react';

export async function generateStaticParams() {
  // Fetch available combinations from CMS/DB at build time
  // This enables building thousands of pages programmatically
  const seoPages = [
    { service: 'ai-development', industry: 'healthcare', location: 'mumbai' },
    { service: 'seo', industry: 'retail', location: 'delhi' },
    { service: 'website-development', industry: 'real-estate', location: 'bangalore' }
  ];

  return seoPages.map((page) => ({
    service: page.service,
    industry: page.industry,
    location: page.location,
  }));
}

// Incremental Static Regeneration (ISR) ensures high Lighthouse scores while staying fresh
export const revalidate = 86400; // Revalidate every 24 hours

interface Props {
  params: Promise<{
    service: string;
    industry: string;
    location: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  // Dynamically generate metadata tailored for long-tail SEO queries
  return {
    title: `${capitalize(resolvedParams.service)} for ${capitalize(resolvedParams.industry)} in ${capitalize(resolvedParams.location)} | Infinity Solution`,
    description: `Leading ${capitalize(resolvedParams.service)} agency helping ${capitalize(resolvedParams.industry)} businesses in ${capitalize(resolvedParams.location)} scale and grow.`,
  };
}

export default async function ProgrammaticSEOPage({ params }: Props) {
  const { service, industry, location } = await params;

  return (
    <main className="min-h-screen pt-24 pb-12">
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="glass-panel rounded-3xl p-12 lg:p-20 relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[var(--text-primary)]">
             {capitalize(service)} Services for <br/>
             <span className="text-[var(--accent-primary)]">{capitalize(industry)} in {capitalize(location)}</span>
           </h1>
           <p className="text-xl text-[var(--text-secondary)] max-w-2xl mb-8">
             We specialize in delivering bespoke {service.replace(/-/g, ' ')} solutions tailored specifically for the {industry} sector across {location}. Increase your conversions and streamline operations with our specialized workflows.
           </p>
           {/* Programmatically injected content via CMS would go here */}
        </div>
      </section>
    </main>
  );
}

function capitalize(str: string) {
  if (!str) return '';
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
