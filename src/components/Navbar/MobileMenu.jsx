import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function MobileMenu({ isOpen, onClose, currentUser }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <motion.div 
            className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
          >
            <div className="flex justify-end mb-6">
              <button onClick={onClose} className="p-2">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4">
              <Link 
                to="/blogs" 
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={onClose}
              >
                Blogs
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={onClose}
              >
                About Us
              </Link>
              
              {currentUser ? (
                <>
                  {currentUser.isDoctor && (
                    <Link 
                      to="/create-blog" 
                      className="relative group border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md overflow-hidden"
                      onClick={onClose}
                    >
                      <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className="relative group-hover:text-white transition-colors duration-300">
                        Create Blog
                      </span>
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                    onClick={onClose}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{currentUser.name}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-md text-center hover:shadow-lg transition-all duration-300"
                    onClick={onClose}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="relative group border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md overflow-hidden text-center"
                    onClick={onClose}
                  >
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative group-hover:text-white transition-colors duration-300">
                      Sign Up
                    </span>
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}