export interface EligibilityFormData {
  age: string;
  weight: string;
  lastDonation: string;
  recentSurgery: boolean;
  recentIllness: boolean;
  medications: string[];
  pregnant: boolean;
  diabetes: boolean;
  heartConditions: boolean;
  infectiousDiseases: boolean;
  vaccinations: boolean;
  alcoholUse: boolean;
}

export interface EligibilityResult {
  eligible: boolean;
  message: string;
  reasons?: string[];
}