import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: "AIzaSyAv3R20AHDvJ7C0jpE92NMf6Ugzi4MDhHY",
  authDomain: "mediconnect-blogsv2.firebaseapp.com",
  projectId: "mediconnect-blogsv2",
  storageBucket: "mediconnect-blogsv2.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "798444880994",
  appId: "1:798444880994:web:5f3f39fed3ce36dd59bd3b"
};

// Initialize Firebase with error handling
function initializeFirebase() {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    // Test storage connection
    storage.maxUploadRetryTime = 10000; // 10 seconds
    storage.maxOperationRetryTime = 10000;

    // Enable offline persistence for Firestore
    enableIndexedDbPersistence(db, { synchronizeTabs: true })
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence enabled in first tab only');
        } else if (err.code === 'unimplemented') {
          console.warn('Browser doesn\'t support persistence');
        }
      });

    return { app, auth, db, storage };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    toast.error('Failed to initialize app. Please refresh the page.');
    throw error;
  }
}

const { app, auth, db, storage } = initializeFirebase();

export { app, auth, db, storage };