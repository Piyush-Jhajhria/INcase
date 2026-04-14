
import { motion } from 'framer-motion';
import { Heart, Clock, Users, Award } from 'lucide-react';

export default function WhyDonate() {
  const reasons = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Save Lives",
      description: "One donation can save up to three lives and help countless others."
    },
    {
      icon: <Clock className="h-8 w-8 text-red-500" />,
      title: "Quick & Easy",
      description: "The donation process takes only about an hour from start to finish."
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Constant Need",
      description: "Every two seconds someone in the world needs blood."
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Health Benefits",
      description: "Regular donation can help reduce the risk of certain health conditions."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <motion.div
      id="why-donate"
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900">Why Donate Blood?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Blood donation is a simple yet powerful way to make a real difference in people's lives.
            Here's why you should consider donating:
          </p>
        </motion.div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex justify-center">{reason.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">{reason.title}</h3>
              <p className="mt-2 text-gray-600 text-center">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}