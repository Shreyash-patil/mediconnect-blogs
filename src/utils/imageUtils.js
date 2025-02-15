import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { toast } from 'react-toastify';

export async function uploadImage(file, path) {
  try {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB');
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file');
    }

    console.log('Starting image upload...'); // Debug log

    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);

    console.log('Uploading to path:', `${path}/${fileName}`); // Debug log

    const snapshot = await uploadBytes(storageRef, file);
    console.log('Upload completed'); // Debug log

    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL obtained:', downloadURL); // Debug log

    return downloadURL;
  } catch (error) {
    console.error('Image upload error:', error);
    
    // More specific error messages
    if (error.code === 'storage/unauthorized') {
      toast.error('Storage access denied. Please check Firebase storage rules.');
    } else if (error.code === 'storage/canceled') {
      toast.error('Upload was cancelled. Please try again.');
    } else if (error.code === 'storage/unknown') {
      toast.error('An unknown error occurred. Please try again.');
    } else {
      toast.error(error.message || 'Failed to upload image');
    }
    
    throw error;
  }
}