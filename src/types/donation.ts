export interface DonationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bloodType: string;
  center: string;
  date: string;
  time: string;
}

export interface DonationCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface DonationAppointment extends DonationFormData {
  id: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  userId: string;
  createdAt: string;
}