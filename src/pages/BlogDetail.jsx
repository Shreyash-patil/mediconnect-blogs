import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';
import { FaHeart, FaRegHeart, FaEdit } from 'react-icons/fa';
import { useBlog } from '../hooks/useBlog';
import { useAuth } from '../context/AuthContext';
import DeleteBlogButton from '../components/DeleteBlogButton';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { toggleFavorite } = useBlog(id);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (doc) => {
        if (doc.exists()) {
          const favorites = doc.data().favorites || [];
          setIsFavorited(favorites.includes(id));
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const isAuthor = currentUser?.uid === blog.author.id;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleFavorite}
            className="text-red-500 hover:text-red-600"
          >
            {isFavorited ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </button>
          {isAuthor && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit-blog/${id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>
              <DeleteBlogButton blogId={id} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center text-gray-600 mb-8">
        <span>By Dr. {blog.author.name}</span>
        <span className="mx-2">•</span>
        <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}