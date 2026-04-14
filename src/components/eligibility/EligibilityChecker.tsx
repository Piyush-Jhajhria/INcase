import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { checkEligibility } from '../../utils/eligibility';
import type { EligibilityFormData, EligibilityResult } from '../../types/eligibility';

// Component for checking blood donation eligibility based on user responses
// Implements a comprehensive questionnaire covering medical and lifestyle factors
// TODO: Add validation for edge cases like decimal weights, negative ages
export default function EligibilityChecker() {
  const [formData, setFormData] = useState<EligibilityFormData>({
    age: '',
    weight: '',
    lastDonation: '',
    recentSurgery: false,
    recentIllness: false,
    medications: [],
    pregnant: false,
    diabetes: false,
    heartConditions: false,
    infectiousDiseases: false,
    vaccinations: false,
    alcoholUse: false,
  });

  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eligibilityResult = checkEligibility(formData);
    setResult(eligibilityResult);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Define the eligibility questions in a structured array for easy maintenance
  const questions = [
    { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
    { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'Enter your weight' },
    { name: 'lastDonation', label: 'Months since last donation', type: 'number', placeholder: 'Enter months' },
    { name: 'recentSurgery', label: 'Had surgery in the last 6 months?', type: 'boolean' },
    { name: 'recentIllness', label: 'Had any recent illness?', type: 'boolean' },
    { name: 'pregnant', label: 'Currently pregnant or recently given birth?', type: 'boolean' },
    { name: 'heartConditions', label: 'Have any heart conditions?', type: 'boolean' },
    { name: 'infectiousDiseases', label: 'Have any infectious diseases?', type: 'boolean' },
    { name: 'vaccinations', label: 'Received any vaccinations in the last 2 weeks?', type: 'boolean' },
    { name: 'alcoholUse', label: 'Consumed alcohol in the last 24 hours?', type: 'boolean' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {questions.map((question) => (
            <motion.div
              key={question.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {question.type === 'number' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{question.label}</label>
                  <input
                    type="number"
                    name={question.name}
                    value={formData[question.name as keyof EligibilityFormData] as string}
                    onChange={handleChange}
                    placeholder={question.placeholder}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    min="0"
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-700">{question.label}</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => handleChange({
                        target: { name: question.name, checked: true, type: 'checkbox' }
                      } as any)}
                      className={`px-4 py-2 rounded-full ${
                        formData[question.name as keyof EligibilityFormData]
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange({
                        target: { name: question.name, checked: false, type: 'checkbox' }
                      } as any)}
                      className={`px-4 py-2 rounded-full ${
                        !formData[question.name as keyof EligibilityFormData]
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          type="submit"
          className="w-full bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Check Eligibility
        </motion.button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-6 rounded-lg ${result.eligible ? 'bg-green-50' : 'bg-red-50'}`}
        >
          <div className="flex items-center">
            {result.eligible ? (
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500 mr-2" />
            )}
            <h4 className="text-lg font-semibold">
              {result.eligible ? "You're Eligible!" : "You're Not Eligible"}
            </h4>
          </div>
          <p className="mt-2 text-gray-600">{result.message}</p>
          {result.reasons && (
            <div className="mt-4">
              <h5 className="font-medium flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                Reasons:
              </h5>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                {result.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}