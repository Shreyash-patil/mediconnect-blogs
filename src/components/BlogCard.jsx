import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlog } from '../hooks/useBlog';
import { useAuth } from '../context/AuthContext';
import AnimatedHeart from './ui/AnimatedHeart';
import { motion } from 'framer-motion';

export default function BlogCard({ blog }) {
  const { currentUser } = useAuth();
  const { isFavorited, toggleFavorite } = useBlog(blog.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link 
            to={`/blog/${blog.id}`}
            className="group block flex-1"
          >
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {blog.title}
            </h2>
          </Link>
          <AnimatedHeart 
            isFavorited={isFavorited}
            onClick={toggleFavorite}
            size={20}
          />
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author.name}`}
              alt={blog.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span>Dr. {blog.author.name}</span>
          </div>
          <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
        </div>
      </div>
    </motion.div>
  );
}