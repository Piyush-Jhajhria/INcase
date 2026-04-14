import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Phone, AlertTriangle } from 'lucide-react';
import type { EmergencyInfo } from '../types/emergency';

export default function EmergencyInfoViewer() {
  const { id } = useParams<{ id: string }>();
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadEmergencyInfo(id);
    }
  }, [id]);

  const loadEmergencyInfo = (docId: string) => {
    try {
      console.log('Loading emergency info for ID:', docId);
      
      // Try to decode as base64 (from QR code embedded data)
      try {
        const decoded = decodeURIComponent(atob(docId));
        const parsed = JSON.parse(decoded);
        console.log('Successfully decoded data from QR:', parsed);
        setEmergencyInfo(parsed);
        setError(null);
        setLoading(false);
        return;
      } catch (decodeErr) {
        console.log('Not base64 format, trying localStorage...');
      }
      
      // Fall back to localStorage for local testing
      const data = localStorage.getItem(docId);
      console.log('Data from localStorage:', data);
      if (data) {
        const parsed = JSON.parse(data);
        setEmergencyInfo(parsed);
        setError(null);
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading emergency information...</p>
        </div>
      </div>
    );
  }

  if (error || !emergencyInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg p-8 shadow-lg max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Information Not Found</h1>
          <p className="text-gray-600">{error || 'The emergency information could not be found.'}</p>
          <p className="text-sm text-gray-500 mt-4">ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Emergency Header */}
        <div className="bg-red-600 text-white rounded-t-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl font-bold">EMERGENCY INFO</h1>
          </div>
          <p className="text-red-100 text-sm">Medical Information for First Responders</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6 md:p-8">
          {/* Name and Blood Type - PROMINENT */}
          <div className="mb-8">
            <div className="text-center p-6 bg-red-50 rounded-xl border-2 border-red-500">
              <p className="text-sm font-medium text-red-600 uppercase tracking-wide mb-2">Patient Name</p>
              <p className="text-4xl font-bold text-gray-900 mb-4">{emergencyInfo.fullName}</p>
              {emergencyInfo.bloodType && (
                <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg">
                  <p className="text-2xl font-bold">Blood Type: {emergencyInfo.bloodType}</p>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          {emergencyInfo.emergencyContactName && (
            <div className="mb-6 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Emergency Contact</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{emergencyInfo.emergencyContactName}</p>
                  <p className="text-gray-700 mt-1">{emergencyInfo.emergencyContactRelation}</p>
                  <p className="text-gray-700 font-semibold text-lg mt-2">{emergencyInfo.emergencyContactPhone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Medical Information */}
          <div className="space-y-6">
            {emergencyInfo.allergies && (
              <div className="p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-600">
                <p className="text-sm font-bold text-yellow-700 uppercase tracking-wide mb-3">⚠️ Allergies</p>
                <p className="text-lg text-gray-900 font-semibold whitespace-pre-wrap">{emergencyInfo.allergies}</p>
              </div>
            )}

            {emergencyInfo.medications && (
              <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-600">
                <p className="text-sm font-bold text-purple-700 uppercase tracking-wide mb-3">💊 Current Medications</p>
                <p className="text-lg text-gray-900 font-semibold whitespace-pre-wrap">{emergencyInfo.medications}</p>
              </div>
            )}

            {emergencyInfo.medicalConditions && (
              <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-600">
                <p className="text-sm font-bold text-green-700 uppercase tracking-wide mb-3">🏥 Medical Conditions</p>
                <p className="text-lg text-gray-900 font-semibold whitespace-pre-wrap">{emergencyInfo.medicalConditions}</p>
              </div>
            )}
          </div>

          {/* Critical Notice */}
          <div className="mt-8 p-6 bg-red-600 text-white rounded-xl text-center">
            <p className="font-bold text-lg">⚠️ CRITICAL MEDICAL INFORMATION</p>
            <p className="text-sm mt-2 opacity-90">This information is vital for emergency medical personnel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
