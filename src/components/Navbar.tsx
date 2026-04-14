import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DonationModal from './donation/DonationModal';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-red-500">
                Home
              </Link>
              <a
                href="#why-donate"
                className="text-gray-700 hover:text-red-500"
              >
                Why Donate
              </a>
              <a
                href="#eligibility"
                className="text-gray-700 hover:text-red-500"
              >
                Eligibility
              </a>
              <a href="#locations" className="text-gray-700 hover:text-red-500">
                Donation Centers
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                Donate Now
              </button>
              {user && (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-red-500">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-red-500 flex items-center gap-2"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <Menu className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      </nav>
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}