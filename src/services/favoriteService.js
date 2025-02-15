import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirebaseError } from '../utils/errorHandling';

export async function toggleBlogFavorite(userId, blogId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const favorites = userDoc.data().favorites || [];
    const isFavorited = favorites.includes(blogId);

    await updateDoc(userRef, {
      favorites: isFavorited ? arrayRemove(blogId) : arrayUnion(blogId)
    });

    return !isFavorited;
  } catch (error) {
    throw handleFirebaseError(error, 'Error updating favorites');
  }
}

export async function getUserFavorites(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    return userDoc.data().favorites || [];
  } catch (error) {
    throw handleFirebaseError(error, 'Error fetching favorites');
  }
}