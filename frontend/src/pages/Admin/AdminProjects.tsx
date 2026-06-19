import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, ExternalLink } from 'lucide-react';
import { Github } from '../../components/shared/BrandIcons';
import { projectsApi } from '../../services/api';
import toast from 'react-hot-toast';

interface Project { id: string; title: string; category: string; featured: boolean; technologies: string[]; githubUrl?: string; liveUrl?: string; }

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    projectsApi.getAll().then(({ data }) => setProjects(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await projectsApi.delete(id);
      toast.success('Project deleted');
      load();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">Manage Projects</h1>
          </div>
          <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
            Add projects via API / seed data
          </span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between bg-gray-900 rounded-xl border border-gray-800 px-5 py-4 hover:border-gray-700 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white truncate">{p.title}</h3>
                    {p.featured && <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">Featured</span>}
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{p.category} · {p.technologies.slice(0, 3).join(', ')}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={16} /></a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><ExternalLink size={16} /></a>}
                  <button onClick={() => handleDelete(p.id, p.title)} className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && <p className="text-center text-gray-500 py-12">No projects yet. Add them via the API or seed the database.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
