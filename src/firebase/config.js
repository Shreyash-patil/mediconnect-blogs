import { auth } from './auth';
import { db, initializeFirestore } from './firestore';
import { storage } from './storage';

// Initialize Firestore offline persistence
initializeFirestore().catch(console.error);

export { auth, db, storage };