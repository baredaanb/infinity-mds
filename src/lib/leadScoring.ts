// src/lib/leadScoring.ts

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  serviceInterest?: string;
  source?: string;
  engagementMetrics: {
    pagesViewed: number;
    timeOnSiteSeconds: number;
    downloadedCaseStudy: boolean;
    interactedWithChatbot: boolean;
  };
}

/**
 * Calculates a lead score (0-100+) based on firmographic data and engagement depth.
 */
export function calculateLeadScore(lead: LeadPayload): number {
  let score = 0;

  // Base profile scoring
  if (lead.company) score += 10;
  
  // High-value service intent (e.g., AI or App Development often have higher LTV)
  const highValueServices = ['ai-development', 'app-development', 'website-development'];
  if (lead.serviceInterest && highValueServices.includes(lead.serviceInterest)) {
    score += 20;
  } else if (lead.serviceInterest) {
    score += 10; // Standard service interest
  }

  // Engagement depth scoring (Behavioral signals)
  if (lead.engagementMetrics.pagesViewed > 3) score += 10;
  if (lead.engagementMetrics.timeOnSiteSeconds > 120) score += 15;
  if (lead.engagementMetrics.downloadedCaseStudy) score += 25; // High intent signal
  if (lead.engagementMetrics.interactedWithChatbot) score += 10;

  return score;
}

/**
 * Middleware layer to process the lead, calculate the score, and push to the CRM webhook.
 */
export async function processLeadSubmission(lead: LeadPayload) {
  const score = calculateLeadScore(lead);
  
  // Categorize based on score
  let priority = "NEW";
  if (score > 60) priority = "HOT";
  else if (score > 30) priority = "WARM";
  
  const crmPayload = {
    ...lead,
    leadScore: score,
    priority,
    timestamp: new Date().toISOString()
  };

  // Simulate pushing to CRM Webhook (HubSpot/Zoho/Salesforce)
  /*
  await fetch('https://crm.example.com/api/webhooks/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(crmPayload)
  });
  */

  return crmPayload;
}
