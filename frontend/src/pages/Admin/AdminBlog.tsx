import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Eye, EyeOff } from 'lucide-react';
import { blogApi } from '../../services/api';
import toast from 'react-hot-toast';

interface Post { id: string; title: string; published: boolean; tags: string[]; readTime: number; createdAt: string; }

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    blogApi.getAllAdmin().then(({ data }) => setPosts(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const togglePublish = async (id: string, published: boolean) => {
    try {
      await blogApi.update(id, { published: !published });
      toast.success(!published ? 'Post published' : 'Post unpublished');
      load();
    } catch { toast.error('Failed to update post'); }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await blogApi.delete(id);
      toast.success('Post deleted');
      load();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <h1 className="text-xl font-bold">Manage Blog Posts</h1>
        </div>

        <div className="space-y-3">
          {loading ? [1,2,3].map(i => <div key={i} className="h-16 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />) :
            posts.map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between bg-gray-900 rounded-xl border border-gray-800 px-5 py-4 hover:border-gray-700 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white truncate">{p.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${p.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{p.tags.join(', ')} · {p.readTime} min read</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => togglePublish(p.id, p.published)} className="p-2 text-gray-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-500/10">
                    {p.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={() => handleDelete(p.id, p.title)} className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          }
          {!loading && posts.length === 0 && <p className="text-center text-gray-500 py-12">No blog posts yet.</p>}
        </div>
      </div>
    </div>
  );
}
