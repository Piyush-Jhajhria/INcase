import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserDonationAppointments } from '../services/database.service';
import { Calendar, User } from 'lucide-react';
import type { DonationAppointment } from '../types/donation';

export default function UserDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<DonationAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const appointmentsData = await getUserDonationAppointments(user!.id);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Please log in to view your dashboard</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your donation appointments</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Donation Appointments</h2>
          </div>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled yet.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.firstName} {appointment.lastName}</p>
                      <p className="text-sm text-gray-600">{appointment.center}</p>
                      <p className="text-sm text-gray-600">{appointment.date} {appointment.time}</p>
                      <p className="text-sm text-gray-600">Blood Type: {appointment.bloodType}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}