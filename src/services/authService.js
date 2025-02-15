import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent! Please check your inbox.');
  } catch (error) {
    console.error('Password reset error:', error);
    switch (error.code) {
      case 'auth/user-not-found':
        toast.error('No account found with this email address.');
        break;
      case 'auth/invalid-email':
        toast.error('Please enter a valid email address.');
        break;
      default:
        toast.error('Failed to send reset email. Please try again.');
    }
    throw error;
  }
}