import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img
        src="/medical-icon.svg"
        alt="MediConnect Logo"
        className="h-8 w-8"
      />
      <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        MediConnect
      </span>
    </Link>
  );
}