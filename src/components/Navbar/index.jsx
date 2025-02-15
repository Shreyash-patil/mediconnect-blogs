import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <NavLinks className="hidden md:flex ml-10" />
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-4">
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
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-md hover:shadow-lg transition-all duration-300"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="relative group border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md overflow-hidden"
                  >
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative group-hover:text-white transition-colors duration-300">
                      Sign Up
                    </span>
                  </Link>
                </motion.div>
              </div>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentUser={currentUser}
      />
    </motion.nav>
  );
}