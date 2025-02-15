import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function AnimatedHeart({ isFavorited, onClick, size = 20 }) {
  return (
    <motion.button
      onClick={onClick}
      className="text-red-500 hover:text-red-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 1 }}
      animate={{
        scale: isFavorited ? [1, 1.2, 1] : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {isFavorited ? <FaHeart size={size} /> : <FaRegHeart size={size} />}
    </motion.button>
  );
}