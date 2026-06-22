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
  
  // Creation state
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
      await blogApi.create({
        title,
        excerpt,
        content,
        coverImage: coverImage || undefined,
        tags,
        readTime: Number(readTime),
        published,
      });
      toast.success('Blog post created successfully!');
      
      // Reset form fields
      setTitle('');
      setExcerpt('');
      setCoverImage('');
      setTagsStr('');
      setReadTime(5);
      setContent('');
      setPublished(true);
      setIsCreating(false);
      load();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to create blog post';
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="text-xl font-bold">Manage Blog Posts</h1>
          </div>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg text-sm transition-colors"
            >
              Add New Post
            </button>
          )}
        </div>

        {isCreating ? (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 mb-8"
          >
            <h2 className="text-lg font-bold text-cyan-400">Create New Blog Post</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Title * (min 5 chars)</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" placeholder="e.g. Advancements in Smart Grid Systems" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Tags (comma separated)</label>
                <input type="text" value={tagsStr} onChange={e => setTagsStr(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" placeholder="e.g. Smart Grid, Engineering, IoT" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Cover Image URL (Optional)</label>
                <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" placeholder="https://images.unsplash.com/..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Read Time (minutes)</label>
                <input required type="number" min={1} value={readTime} onChange={e => setReadTime(Number(e.target.value))} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 flex justify-between">
                <span>Excerpt * (20 to 600 chars)</span>
                <span className={`font-mono text-[10px] ${excerpt.length > 600 ? 'text-red-500' : 'text-gray-500'}`}>
                  {excerpt.length} / 600
                </span>
              </label>
              <input required type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" placeholder="A short description summarizing the post..." />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Content * (min 50 chars - Markdown Supported)</label>
              <textarea required rows={10} value={content} onChange={e => setContent(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none font-mono" placeholder="# Heading 1\n\nWrite your blog content here..." />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="rounded border-gray-800 bg-gray-950 text-cyan-500 focus:ring-cyan-500" />
                <span>Publish Immediately</span>
              </label>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 border border-gray-800 text-gray-400 hover:text-white rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg text-sm transition-colors">Create Post</button>
              </div>
            </div>
          </motion.form>
        ) : (
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
        )}
      </div>
    </div>
  );
}

