import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirebaseError } from '../utils/errorHandling';

export async function createUserProfile(uid, userData) {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date().toISOString(),
      favorites: []
    });
  } catch (error) {
    throw handleFirebaseError(error, 'Error creating user profile');
  }
}

export async function getUserProfile(uid) {
  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      throw new Error('User profile not found');
    }
    
    return docSnap.data();
  } catch (error) {
    throw handleFirebaseError(error, 'Error fetching user profile');
  }
}

export async function updateUserFavorites(uid, blogId, isFavoriting) {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const favorites = userDoc.data().favorites || [];
    const updatedFavorites = isFavoriting
      ? [...favorites, blogId]
      : favorites.filter(id => id !== blogId);
    
    await updateDoc(userRef, { favorites: updatedFavorites });
    return updatedFavorites;
  } catch (error) {
    throw handleFirebaseError(error, 'Error updating favorites');
  }
}