import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirebaseError } from '../utils/errorHandling';

export async function createBlog(blogData) {
  try {
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw handleFirebaseError(error, 'Error creating blog post');
  }
}

export async function getBlogById(id) {
  try {
    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Blog not found');
    }
    
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    throw handleFirebaseError(error, 'Error fetching blog');
  }
}

export async function updateBlog(blogId, updateData) {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    const blogDoc = await getDoc(blogRef);
    
    if (!blogDoc.exists()) {
      throw new Error('Blog not found');
    }

    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(blogRef, updatedData);
    return { id: blogId, ...updatedData };
  } catch (error) {
    throw handleFirebaseError(error, 'Error updating blog post');
  }
}

export async function deleteBlog(blogId) {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    const blogDoc = await getDoc(blogRef);
    
    if (!blogDoc.exists()) {
      throw new Error('Blog not found');
    }

    await deleteDoc(blogRef);
    return true;
  } catch (error) {
    throw handleFirebaseError(error, 'Error deleting blog post');
  }
}