import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { app } from './initialize';

export const db = getFirestore(app);

// Initialize Firestore with offline persistence
export async function initializeFirestore() {
  try {
    await enableIndexedDbPersistence(db, {
      synchronizeTabs: true
    });
    console.log('Offline persistence enabled');
  } catch (err) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence enabled in first tab only');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser doesn\'t support persistence');
    }
  }
}