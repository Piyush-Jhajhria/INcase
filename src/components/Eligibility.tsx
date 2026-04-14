

export default function Eligibility() {
  const requirements = [
    "Be at least 17 years old",
    "Weigh at least 110 pounds",
    "Be in good general health",
    "Have not donated in the last 56 days",
    "Have a valid ID",
    "Pass the physical and health history assessments"
  ];

  return (
    <div id="eligibility" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Eligibility Requirements</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            To ensure the safety of both donors and recipients, we have certain eligibility requirements
            that must be met before donating blood.
          </p>
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-sm">✓</span>
                  </div>
                  <span className="ml-3 text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}