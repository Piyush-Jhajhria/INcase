import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import type { EmergencyInfo } from '../../types/emergency';
import EmergencyForm from './EmergencyForm';
import QRCodeDisplay from './QRCodeDisplay';
import { downloadQRCode } from '../../utils/qrcode';
import { getBaseUrl, getAccessInstructions, getQRCodeUrl } from '../../utils/baseUrl';
import { useAuth } from '../../context/AuthContext';

export default function EmergencyQRCode() {
  const { user } = useAuth();
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo>({
    fullName: '',
    bloodType: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    allergies: '',
    medications: '',
    medicalConditions: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [displayIP, setDisplayIP] = useState<string>('');

  // Display access instructions when component mounts
  useEffect(() => {
    // Get appropriate access instructions based on current environment
    const instructions = getAccessInstructions();
    setDisplayIP(instructions);
    
    // Log the base URL for debugging
    const baseUrl = getBaseUrl();
    console.log('QR Code Base URL:', baseUrl);
    console.log('Instructions:', instructions);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmergencyInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    if (!emergencyInfo.fullName) {
      setError('Please enter your full name before generating the QR code.');
      return;
    }

    if (qrUrl) {
      const filename = `emergency-info-${emergencyInfo.fullName.toLowerCase().replace(/\s+/g, '-')}`;
      downloadQRCode(qrUrl, filename);
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      // FIX: Use getQRCodeUrl() to ensure mobile-accessible URLs
      // This function automatically detects if running on localhost and suggests network IP
      // When Vite runs with --host flag, it's accessible via the machine's IP address
      
      const jsonString = JSON.stringify(emergencyInfo);
      const encoded = btoa(encodeURIComponent(jsonString));
      
      // Use dynamic base URL that works on mobile
      // If accessed via network IP, this will be that IP
      // If on localhost, user will see instructions to use machine IP
      const emergencyUrl = getQRCodeUrl(`/emergency-view/${encoded}`);
      
      console.log('✓ Generated QR URL (Mobile Accessible):', emergencyUrl);
      console.log('ℹ Base URL:', getBaseUrl());
      console.log('ℹ Instructions for mobile:', getAccessInstructions());
      
      setQrUrl(emergencyUrl);
      
      setTimeout(() => {
        try {
          const filename = `emergency-info-${emergencyInfo.fullName.toLowerCase().replace(/\s+/g, '-')}`;
          downloadQRCode(emergencyUrl, filename);
          console.log('✓ QR code downloaded successfully');
        } catch (downloadErr) {
          console.error('✗ Download error:', downloadErr);
        }
      }, 300);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('✗ Error during QR generation:', err);
      setError(`Failed to generate QR code: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-8 w-8 text-red-500 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Emergency Information QR Code</h3>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            <p className="font-semibold">Error:</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <EmergencyForm 
            emergencyInfo={emergencyInfo}
            onChange={handleChange}
          />
          <QRCodeDisplay 
            qrValue={qrUrl}
            onDownload={handleDownload}
            isLoading={isSaving}
            accessInstructions={displayIP}
          />
        </div>
      </div>
    </div>
  );
}