import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, MessageSquare, BookOpen, Users, LogOut, BarChart3, Inbox } from 'lucide-react';
import { adminApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface Stats {
  projects: number;
  testimonials: number;
  blogs: number;
  contacts: number;
  unreadContacts: number;
}

const cards = [
  { label: 'Projects', key: 'projects', Icon: FolderOpen, color: 'from-cyan-500 to-blue-500', href: '/admin/projects' },
  { label: 'Blog Posts', key: 'blogs', Icon: BookOpen, color: 'from-purple-500 to-pink-500', href: '/admin/blog' },
  { label: 'Testimonials', key: 'testimonials', Icon: Users, color: 'from-green-500 to-emerald-500', href: '/admin/testimonials' },
  { label: 'Contact Messages', key: 'contacts', Icon: MessageSquare, color: 'from-amber-500 to-orange-500', href: '/admin/contacts' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    adminApi.getStats().then(({ data }) => setStats(data));
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <BarChart3 size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{user?.email}</span>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-2xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-gray-400 mt-1">Here's an overview of your portfolio content.</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cards.map(({ label, key, Icon, color, href }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={href}
                className="block bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-gray-600 transition-all group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats ? stats[key as keyof Stats] : '—'}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300">{label}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Unread messages alert */}
        {stats?.unreadContacts ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link
              to="/admin/contacts"
              className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-500/15 transition-colors"
            >
              <Inbox size={18} />
              <span className="text-sm font-medium">
                You have {stats.unreadContacts} unread contact message{stats.unreadContacts > 1 ? 's' : ''} — click to view
              </span>
            </Link>
          </motion.div>
        ) : null}

        {/* Quick links */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {cards.map(({ label, href, Icon, color }) => (
            <Link
              key={href}
              to={href}
              className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 transition-all group"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Manage {label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
