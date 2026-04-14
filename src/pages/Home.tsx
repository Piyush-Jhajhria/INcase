
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyDonate from '../components/WhyDonate';
import Eligibility from '../components/Eligibility';
import DonationCenters from '../components/DonationCenters';
import EligibilityChecker from '../components/eligibility/EligibilityChecker';
import EmergencyQRCode from '../components/emergency/EmergencyQRCode';

// Main application component that handles routing and authentication flow
export default function Home() {
  const { isAuthenticated } = useAuth();

  // Show authentication modal if user is not logged in
  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhyDonate />
      <Eligibility />
      <section id="eligibility-checker" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Check Your Eligibility</h2>
            <p className="mt-4 text-lg text-gray-600">
              Use our eligibility checker to see if you can donate blood today.
            </p>
          </div>
          <EligibilityChecker />
        </div>
      </section>
      <section id="emergency-info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Emergency Information</h2>
            <p className="mt-4 text-lg text-gray-600">
              Create your emergency QR code containing vital medical information for first responders.
            </p>
          </div>
          <EmergencyQRCode />
        </div>
      </section>
      <DonationCenters />
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 INcase Blood Donation. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Emergency Hotline: +91 1800-000-0000</p>
        </div>
      </footer>
    </div>
  );
}
