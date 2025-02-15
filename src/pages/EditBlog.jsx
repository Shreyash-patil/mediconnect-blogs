import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBlogById, updateBlog } from '../services/blogService';
import { toast } from 'react-toastify';
import BlogEditor from '../components/BlogEditor';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchBlog() {
      try {
        const blogData = await getBlogById(id);
        if (blogData.author.id !== currentUser.uid) {
          toast.error('Unauthorized to edit this blog');
          navigate('/blogs');
          return;
        }
        setBlog(blogData);
        setTitle(blogData.title);
        setContent(blogData.content);
      } catch (error) {
        toast.error('Failed to fetch blog');
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id, currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const updatedBlog = await updateBlog(
        id,
        {
          title: title.trim(),
          content,
          excerpt: content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
        }
      );

      toast.success('Blog post updated successfully!');
      navigate(`/blog/${updatedBlog.id}`);
    } catch (error) {
      toast.error('Failed to update blog post');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <BlogEditor content={content} onChange={setContent} />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/blog/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}