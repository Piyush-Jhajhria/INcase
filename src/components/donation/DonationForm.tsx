import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import { validateEmail, validatePhone } from '../../utils/validation';
import { indianDonationCenters } from '../../data/donationCenters';
import { useAuth } from '../../context/AuthContext';
import { saveDonationAppointment } from '../../services/database.service';
import type { DonationFormData } from '../../types/donation';

export default function DonationForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DonationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bloodType: '',
    center: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<Partial<DonationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to schedule an appointment.');
      return;
    }

    const newErrors: Partial<DonationFormData> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit mobile number';
    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.center) newErrors.center = 'Donation center is required';
    if (!formData.date) newErrors.date = 'Date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveDonationAppointment({ ...formData, userId: user.id });
      if (result.success) {
        alert('Appointment scheduled successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          bloodType: '',
          center: '',
          date: '',
          time: '',
        });
      } else {
        alert('Failed to schedule appointment. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <div className="mt-1">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-md"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <div className="mt-1">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-md"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-md"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1">
            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-md"
              maxLength={10}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Donation Center</label>
          <div className="mt-1">
            <select
              name="center"
              value={formData.center}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Donation Center</option>
              {indianDonationCenters.map(center => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
            {errors.center && <p className="mt-1 text-sm text-red-600">{errors.center}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Type</label>
          <div className="mt-1">
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Blood Type</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.bloodType && <p className="mt-1 text-sm text-red-600">{errors.bloodType}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <div className="mt-1">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="block w-full px-4 py-2 border rounded-md"
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Droplets className="mr-2 h-5 w-5" />
          {isSubmitting ? 'Scheduling...' : 'Schedule Donation'}
        </button>
      </div>
    </form>
  );
}