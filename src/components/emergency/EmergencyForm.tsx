import { ChangeEvent } from 'react';
import type { EmergencyInfo } from '../../types/emergency';

interface EmergencyFormProps {
  emergencyInfo: EmergencyInfo;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function EmergencyForm({ emergencyInfo, onChange }: EmergencyFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={emergencyInfo.fullName}
          onChange={onChange as any}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Blood Type</label>
        <select
          name="bloodType"
          value={emergencyInfo.bloodType}
          onChange={onChange as any}
          className="mt-1 block w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Blood Type</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            value={emergencyInfo.emergencyContactName}
            onChange={onChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            placeholder="Full name of emergency contact"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Relationship</label>
          <input
            type="text"
            name="emergencyContactRelation"
            value={emergencyInfo.emergencyContactRelation}
            onChange={onChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            placeholder="e.g., Parent, Spouse, Sibling"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={emergencyInfo.emergencyContactPhone}
            onChange={onChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        <textarea
          name="allergies"
          value={emergencyInfo.allergies}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md"
          rows={2}
          placeholder="List any allergies"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Medications</label>
        <textarea
          name="medications"
          value={emergencyInfo.medications}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md"
          rows={2}
          placeholder="List current medications"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
        <textarea
          name="medicalConditions"
          value={emergencyInfo.medicalConditions}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md"
          rows={2}
          placeholder="List any medical conditions"
        />
      </div>
    </div>
  );
}