import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Star } from 'lucide-react';
import { testimonialsApi } from '../../services/api';
import toast from 'react-hot-toast';

interface T { id: string; name: string; role: string; company?: string; rating: number; published: boolean; }

export default function AdminTestimonials() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => testimonialsApi.getAllAdmin().then(({ data }) => setItems(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try { await testimonialsApi.delete(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <h1 className="text-xl font-bold">Manage Testimonials</h1>
        </div>
        <div className="space-y-3">
          {loading ? [1,2,3].map(i => <div key={i} className="h-16 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />) :
            items.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-gray-900 rounded-xl border border-gray-800 px-5 py-4">
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                  <div className="flex gap-0.5 mt-1">{Array.from({length: 5}).map((_,i) => <Star key={i} size={12} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'} />)}</div>
                </div>
                <button onClick={() => handleDelete(t.id, t.name)} className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          }
          {!loading && items.length === 0 && <p className="text-center text-gray-500 py-12">No testimonials yet.</p>}
        </div>
      </div>
    </div>
  );
}
