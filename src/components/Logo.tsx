
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Logo() {
  return (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="h-7 w-7 text-red-500 fill-current" />
      </motion.div>
      <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
        INcase
      </span>
    </motion.div>
  );
}