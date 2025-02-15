import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DoctorRoute() {
  const { currentUser } = useAuth();
  return currentUser?.isDoctor ? <Outlet /> : <Navigate to="/" />;
}