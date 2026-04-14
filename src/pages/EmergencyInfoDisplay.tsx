import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Shield, Phone, Heart, AlertTriangle } from 'lucide-react';
import type { EmergencyInfo } from '../types/emergency';

export default function EmergencyInfoDisplay() {
  const { id } = useParams<{ id: string }>();
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadEmergencyInfo(id);
    }
  }, [id]);

  const loadEmergencyInfo = async (docId: string) => {
    try {
      const docRef = doc(db, 'emergencyInfo', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEmergencyInfo(docSnap.data() as EmergencyInfo);
      } else {
        setError('Emergency information not found');
      }
    } catch (err) {
      console.error('Error loading emergency info:', err);
      setError('Failed to load emergency information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading emergency information...</p>
        </div>
      </div>
    );
  }

  if (error || !emergencyInfo) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergency Information Not Found</h1>
          <p className="text-gray-600">{error || 'The requested emergency information could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Header */}
        <div className="bg-red-600 text-white rounded-t-lg p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">EMERGENCY MEDICAL INFORMATION</h1>
              <p className="text-red-100">Keep this information accessible in case of emergency</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {/* Photo Section - Removed */}

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Personal Information
              </h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {emergencyInfo.fullName}</p>
                <p><span className="font-medium">Blood Type:</span> {emergencyInfo.bloodType}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-500" />
                Emergency Contact
              </h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {emergencyInfo.emergencyContactName}</p>
                <p><span className="font-medium">Relation:</span> {emergencyInfo.emergencyContactRelation}</p>
                <p><span className="font-medium">Phone:</span> {emergencyInfo.emergencyContactPhone}</p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Medical Information
            </h2>
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <p className="font-medium text-red-600">Allergies:</p>
                <p className="text-gray-700">{emergencyInfo.allergies || 'None specified'}</p>
              </div>
              <div>
                <p className="font-medium text-red-600">Medications:</p>
                <p className="text-gray-700">{emergencyInfo.medications || 'None specified'}</p>
              </div>
              <div>
                <p className="font-medium text-red-600">Medical Conditions:</p>
                <p className="text-gray-700">{emergencyInfo.medicalConditions || 'None specified'}</p>
              </div>
            </div>
          </div>

          {/* Emergency Instructions */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Emergency Instructions</h3>
            <ul className="text-red-700 space-y-1">
              <li>• Contact emergency services immediately if unconscious</li>
              <li>• Provide this medical information to healthcare providers</li>
              <li>• Call emergency contact if patient is unable to communicate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}