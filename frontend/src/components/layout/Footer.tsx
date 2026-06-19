import { Link } from 'react-router-dom';
import { Briefcase, AtSign, Mail, Code2, Heart } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/uzo-john', Icon: Code2 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/johnpauluzowuru', Icon: Briefcase },
  { label: 'Twitter', href: 'https://twitter.com/johnpauluzowuru', Icon: AtSign },
  { label: 'Email', href: 'mailto:johnpauluzowuru2018@gmail.com', Icon: Mail },
];

const links = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg"><span className="text-cyan-500">Dev</span>Portfolio</span>
            </Link>
            <p className="text-sm leading-relaxed">Frontend Developer & Electrical Engineer passionate about building elegant solutions at the intersection of technology and engineering.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map(({ label, to }) => (
                <li key={to}><Link to={to} className="text-sm hover:text-cyan-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-colors duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-1">Built with <Heart size={14} className="text-red-500 fill-red-500" /> using React &amp; NestJS</p>
        </div>
      </div>
    </footer>
  );
}
