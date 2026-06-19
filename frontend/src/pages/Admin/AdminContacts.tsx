import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Mail } from 'lucide-react';
import { contactApi } from '../../services/api';
import toast from 'react-hot-toast';

interface Contact { id: string; name: string; email: string; subject: string; message: string; read: boolean; createdAt: string; }

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const load = () => contactApi.getAll().then(({ data }) => setContacts(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try { await contactApi.markRead(id); load(); }
    catch { toast.error('Failed to mark as read'); }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <h1 className="text-xl font-bold">Contact Messages</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-2">
            {loading ? [1,2,3].map(i => <div key={i} className="h-20 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />) :
              contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelected(c); if (!c.read) markRead(c.id); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === c.id ? 'border-cyan-500 bg-cyan-500/10' : c.read ? 'border-gray-800 bg-gray-900 hover:border-gray-700' : 'border-gray-700 bg-gray-900 hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {!c.read && <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />}
                    <p className="font-medium text-white text-sm truncate">{c.name}</p>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.subject}</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                </button>
              ))
            }
            {!loading && contacts.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No messages yet</p>}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-bold text-white text-lg">{selected.subject}</h2>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                      <Mail size={14} /> {selected.name} · {selected.email}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(selected.createdAt).toLocaleString()}</span>
                </div>
                <div className="prose-sm text-gray-300 leading-relaxed whitespace-pre-wrap border-t border-gray-800 pt-4">
                  {selected.message}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selected.email);
                    toast.success('Email copied to clipboard!');
                    window.location.href = `mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`;
                  }}
                  className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition-colors"
                >
                  <Mail size={15} /> Reply via Email
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-900 rounded-xl border border-gray-800">
                <div className="text-center">
                  <Eye size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
