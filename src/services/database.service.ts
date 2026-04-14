import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { DonationFormData, DonationAppointment } from '../types/donation';
import type { EmergencyInfo } from '../types/emergency';
import type { EligibilityResult } from '../types/eligibility';

// Local storage keys
const DONATION_APPOINTMENTS_KEY = 'donationAppointments';

// Donation Appointments - Local Storage
export const saveDonationAppointment = async (appointmentData: DonationFormData & { userId: string }) => {
  try {
    // Get existing appointments from localStorage
    const existingAppointments = getStoredDonationAppointments();

    // Add new appointment
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date().toISOString(),
      status: 'scheduled' as const
    };

    existingAppointments.push(newAppointment);

    // Save back to localStorage
    localStorage.setItem(DONATION_APPOINTMENTS_KEY, JSON.stringify(existingAppointments));

    return { success: true, id: newAppointment.id };
  } catch (err) {
    console.error('Error saving donation appointment:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
};

export const getUserDonationAppointments = async (userId: string): Promise<DonationAppointment[]> => {
  try {
    const appointments = getStoredDonationAppointments();
    // Filter by userId
    return appointments.filter((appointment) => appointment.userId === userId);
  } catch (error) {
    console.error('Error fetching donation appointments:', error);
    return [];
  }
};

// Helper function to get appointments from localStorage
const getStoredDonationAppointments = (): DonationAppointment[] => {
  try {
    const stored = localStorage.getItem(DONATION_APPOINTMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Emergency Information
export const saveEmergencyInfo = async (emergencyData: EmergencyInfo & { userId: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'emergencyInfo'), {
      ...emergencyData,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('Error saving emergency info:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
};

export const getUserEmergencyInfo = async (userId: string) => {
  try {
    const q = query(collection(db, 'emergencyInfo'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching emergency info:', error);
    return [];
  }
};

// Eligibility Results (optional caching)
export const saveEligibilityResult = async (userId: string, result: EligibilityResult) => {
  try {
    const docRef = await addDoc(collection(db, 'eligibilityResults'), {
      userId,
      result,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('Error saving eligibility result:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
};