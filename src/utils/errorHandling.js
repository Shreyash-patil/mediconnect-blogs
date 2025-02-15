import { toast } from 'react-toastify';

export const FirebaseErrorCodes = {
  UNAVAILABLE: 'unavailable',
  PERMISSION_DENIED: 'permission-denied',
  NOT_FOUND: 'not-found',
  ALREADY_EXISTS: 'already-exists',
  UNAUTHENTICATED: 'unauthenticated',
  INVALID_ARGUMENT: 'invalid-argument',
  NETWORK_ERROR: 'network-error',
};

export function handleFirebaseError(error, customMessage = '') {
  console.error('Firebase Error:', error);

  // Check for network connectivity
  if (!navigator.onLine) {
    const offlineMessage = 'You are offline. Please check your internet connection.';
    toast.error(offlineMessage);
    return offlineMessage;
  }

  let message = customMessage || 'An error occurred. Please try again.';

  switch (error.code) {
    case FirebaseErrorCodes.UNAVAILABLE:
      message = 'Service is temporarily unavailable. Please try again in a few moments.';
      break;
    case FirebaseErrorCodes.PERMISSION_DENIED:
      message = 'You do not have permission to perform this action.';
      break;
    case FirebaseErrorCodes.NOT_FOUND:
      message = 'The requested resource was not found.';
      break;
    case FirebaseErrorCodes.ALREADY_EXISTS:
      message = 'This resource already exists.';
      break;
    case FirebaseErrorCodes.UNAUTHENTICATED:
      message = 'Please log in to continue.';
      break;
    case FirebaseErrorCodes.INVALID_ARGUMENT:
      message = 'Invalid input provided.';
      break;
    case FirebaseErrorCodes.NETWORK_ERROR:
      message = 'Network connection error. Please check your internet connection.';
      break;
    default:
      if (error.message?.includes('network')) {
        message = 'Network connection error. Please check your internet connection.';
      }
  }

  toast.error(message);
  return message;
}

export function handleNetworkError(error) {
  const message = 'Network error. Please check your internet connection and try again.';
  console.error('Network Error:', error);
  toast.error(message);
  return message;
}