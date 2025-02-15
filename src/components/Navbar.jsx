import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/medical-icon.svg"
                alt="MediConnect Logo"
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                MediConnect
              </span>
            </Link>
            <div className="ml-10 flex space-x-4">
              <Link 
                to="/blogs" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
              >
                Blogs
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {currentUser.isDoctor && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/create-blog" 
                      className="relative group border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md overflow-hidden"
                    >
                      <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className="relative group-hover:text-white transition-colors duration-300">
                        Create Blog
                      </span>
                    </Link>
                  </motion.div>
                )}
                
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
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
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}