import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { toggleBlogFavorite } from '../services/favoriteService';
import { toast } from 'react-toastify';

export function useBlog(blogId) {
  const { currentUser } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    // Set up real-time listener for user's favorites
    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (doc) => {
        if (doc.exists()) {
          const favorites = doc.data().favorites || [];
          setIsFavorited(favorites.includes(blogId));
        }
      },
      (error) => {
        console.error('Favorites listener error:', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser, blogId]);

  const toggleFavorite = async () => {
    if (!currentUser) {
      toast.error('Please login to favorite blogs');
      return;
    }

    try {
      await toggleBlogFavorite(currentUser.uid, blogId);
      // No need to update state here as the listener will handle it
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  return { isFavorited, toggleFavorite };
}