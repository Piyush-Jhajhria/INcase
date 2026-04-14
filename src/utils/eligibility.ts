import type { EligibilityFormData, EligibilityResult } from '../types/eligibility';

// Utility function to determine blood donation eligibility based on WHO guidelines
// and standard medical criteria for safe blood donation
export const checkEligibility = (data: EligibilityFormData): EligibilityResult => {
  const reasons: string[] = [];
  const age = parseInt(data.age);
  const weight = parseInt(data.weight);
  const lastDonation = parseInt(data.lastDonation) || 0;

  // Age restrictions based on standard blood donation guidelines
  if (age < 18 || age > 65) {
    reasons.push('Age must be between 18 and 65 years');
  }

  // Minimum weight requirement for safe donation
  if (weight < 50) {
    reasons.push('Weight must be at least 50 kg');
  }

  // Recovery period between donations
  if (lastDonation < 3) {
    reasons.push('Must wait at least 3 months between donations');
  }

  if (data.recentSurgery) {
    reasons.push('Must wait 6 months after surgery');
  }

  if (data.recentIllness) {
    reasons.push('Must be fully recovered from recent illness');
  }

  if (data.pregnant) {
    reasons.push('Cannot donate while pregnant or within 6 months after delivery');
  }

  if (data.heartConditions) {
    reasons.push('Cannot donate with certain heart conditions');
  }

  if (data.infectiousDiseases) {
    reasons.push('Cannot donate with infectious diseases');
  }

  if (data.alcoholUse) {
    reasons.push('Must not have consumed alcohol in the last 24 hours');
  }

  if (data.vaccinations) {
    reasons.push('Must wait 2 weeks after vaccination');
  }

  return {
    eligible: reasons.length === 0,
    message: reasons.length === 0 
      ? 'Great news! You appear to be eligible to donate blood. Please schedule your donation appointment.'
      : 'Based on your responses, you may not be eligible to donate at this time.',
    reasons: reasons.length > 0 ? reasons : undefined
  };
};

// Note: Eligibility criteria based on standard medical guidelines
// Future enhancement: Integrate with local blood bank policies for region-specific rules