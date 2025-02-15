import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirebaseError, handleNetworkError } from './errorHandling';

export async function getUserBlogs(userId) {
  try {
    const blogsQuery = query(
      collection(db, 'blogs'),
      where('author.id', '==', userId)
    );
    const blogsSnapshot = await getDocs(blogsQuery);
    return blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    if (error.name === 'FirebaseError') {
      handleFirebaseError(error, 'Error fetching user blogs');
    } else {
      handleNetworkError(error);
    }
    return [];
  }
}

export async function getFavoriteBlogs(favoriteIds) {
  try {
    const blogs = [];
    for (const blogId of favoriteIds) {
      const blogRef = doc(db, 'blogs', blogId);
      const blogSnap = await getDoc(blogRef);
      if (blogSnap.exists()) {
        blogs.push({ id: blogSnap.id, ...blogSnap.data() });
      }
    }
    return blogs;
  } catch (error) {
    if (error.name === 'FirebaseError') {
      handleFirebaseError(error, 'Error fetching favorite blogs');
    } else {
      handleNetworkError(error);
    }
    return [];
  }
}

export async function getAllBlogs() {
  try {
    const blogsSnapshot = await getDocs(collection(db, 'blogs'));
    return blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    if (error.name === 'FirebaseError') {
      handleFirebaseError(error, 'Error fetching blogs');
    } else {
      handleNetworkError(error);
    }
    return [];
  }
}

// Add retry mechanism for critical operations
export async function retryOperation(operation, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
}