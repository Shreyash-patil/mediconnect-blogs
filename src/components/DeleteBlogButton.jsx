import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBlog } from '../services/blogService';
import { toast } from 'react-toastify';

export default function DeleteBlogButton({ blogId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteBlog(blogId);
      toast.success('Blog post deleted successfully');
      navigate('/blogs');
    } catch (error) {
      toast.error('Failed to delete blog post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
  );
}