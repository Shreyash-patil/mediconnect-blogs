import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserBlogs, getFavoriteBlogs } from '../utils/firebase';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserContent() {
      try {
        if (currentUser?.isDoctor) {
          const userBlogs = await getUserBlogs(currentUser.uid);
          setBlogs(userBlogs);
        }

        if (currentUser?.favorites?.length > 0) {
          const favBlogs = await getFavoriteBlogs(currentUser.favorites);
          setFavoriteBlogs(favBlogs);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    if (currentUser) {
      fetchUserContent();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </motion.button>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {currentUser?.name}</p>
          <p><span className="font-semibold">Email:</span> {currentUser?.email}</p>
          <p><span className="font-semibold">Role:</span> {currentUser?.isDoctor ? 'Doctor' : 'Reader'}</p>
        </div>
      </div>

      {currentUser?.isDoctor && blogs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">My Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}

      {favoriteBlogs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Favorite Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}