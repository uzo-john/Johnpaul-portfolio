import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { blogApi } from '../../services/api';

interface Post {
  title: string; slug: string; content: string; excerpt: string;
  coverImage?: string; tags: string[]; publishedAt: string; readTime: number;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    blogApi.getBySlug(slug)
      .then(({ data }) => setPost(data))
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen pt-24 pb-16 max-w-3xl mx-auto px-4 animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
      <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />)}
    </div>
  );

  if (error || !post) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-gray-400 text-lg">{error || 'Post not found.'}</p>
      <Link to="/blog" className="text-cyan-500 hover:underline flex items-center gap-1"><ArrowLeft size={16} /> Back to Blog</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cyan-500 transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            {post.coverImage && (
              <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 text-xs rounded-full">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-cyan-500 prose-code:bg-gray-100 dark:prose-code:bg-gray-800">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
