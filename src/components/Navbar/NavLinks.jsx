import { Link } from 'react-router-dom';

export default function NavLinks({ className = '' }) {
  return (
    <div className={`flex space-x-4 ${className}`}>
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
  );
}