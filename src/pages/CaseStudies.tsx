
import { motion } from 'framer-motion';
import { AlertCircle, HeartPulse, FileWarning, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const cases = [
    {
      title: "Wrong Blood Group Transfusion Claims Young Life",
      location: "Sawai Man Singh Medical College, Jaipur",
      date: "February 2024",
      description: "Twenty-three-year-old Sachin Sharma, a road accident victim, died after receiving incorrect blood type during surgery. This tragic incident highlights the critical importance of proper blood type verification.",
      source: "Times of India",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Delayed Surgery Due to Missing Consent Forms",
      location: "AIIMS Delhi",
      date: "January 2024",
      description: "A critical surgery was delayed by 6 hours due to missing blood transfusion consent forms from the patient's relatives, emphasizing the need for streamlined emergency protocols.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link to="/">
          <motion.button
            className="mb-8 flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            Return to Home
          </motion.button>
        </Link>

        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Why Every Second Counts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real cases that highlight the critical importance of proper blood donation and management systems.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {cases.map((case_, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={case_.image}
                  alt={case_.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-semibold">{case_.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-red-500 mb-4">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{case_.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{case_.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {case_.date}
                  </span>
                  {case_.source && (
                    <span className="flex items-center gap-1">
                      <FileWarning className="h-4 w-4" />
                      {case_.source}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Your Donation Can Prevent These Tragedies
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <HeartPulse className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Regular Donations</h3>
              <p className="text-gray-600">Help maintain adequate blood supply for emergencies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">Enable immediate treatment without delays</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Save Lives</h3>
              <p className="text-gray-600">Your donation can prevent critical situations</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}