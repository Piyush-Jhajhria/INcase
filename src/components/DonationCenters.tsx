
import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DonationCenters() {
  const centers = [
    {
      name: "All India Institute of Medical Sciences (AIIMS)",
      address: "Ansari Nagar, New Delhi, Delhi 110029",
      phone: "011-2658-8500",
      hours: "24/7 Blood Bank Services"
    },
    {
      name: "Tata Memorial Hospital Blood Bank",
      address: "Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012",
      phone: "022-2417-7000",
      hours: "Mon-Sat: 8AM-6PM"
    },
    {
      name: "Apollo Blood Bank",
      address: "21 Greams Lane, Chennai, Tamil Nadu 600006",
      phone: "044-2829-4870",
      hours: "24/7 Emergency Services"
    },
    {
      name: "Fortis Escorts Heart Institute Blood Bank",
      address: "Okhla Road, New Delhi, Delhi 110025",
      phone: "011-4713-5000",
      hours: "Mon-Sun: 9AM-5PM"
    },
    {
      name: "Manipal Hospital Blood Bank",
      address: "98, HAL Old Airport Road, Bangalore 560017",
      phone: "080-2502-4444",
      hours: "24/7 Blood Bank Services"
    },
    {
      name: "Medanta The Medicity Blood Bank",
      address: "Sector 38, Gurgaon, Haryana 122001",
      phone: "0124-4141-414",
      hours: "Mon-Sun: 8AM-8PM"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div id="locations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Blood Donation Centers in India</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find a blood donation center near you. Walk-ins are welcome, but appointments are preferred
            for a smoother experience.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {centers.map((center, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-gray-900">{center.name}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span className="ml-2 text-gray-600">{center.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="ml-2 text-gray-600">{center.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className="ml-2 text-gray-600">{center.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}