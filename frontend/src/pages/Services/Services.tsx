import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Globe, Cpu, BookOpen, Lightbulb } from 'lucide-react';

const services = [
  {
    Icon: Globe,
    title: 'Web Development',
    description:
      'Building modern, responsive web applications using React, TypeScript, and Node.js. From landing pages to full-stack platforms.',
    features: ['React / Next.js frontends', 'REST API development', 'Database design', 'Performance optimization'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    Icon: Cpu,
    title: 'Engineering Consulting',
    description:
      'Technical consulting for small-scale electrical and electronics engineering projects — from design to simulation.',
    features: ['Circuit design review', 'Power systems analysis', 'Technical documentation'],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    Icon: BookOpen,
    title: 'Technical Training',
    description:
      'Helping beginners get started with web development or core electrical engineering concepts through structured mentoring.',
    features: ['HTML/CSS/JavaScript basics', 'React fundamentals', 'Study guidance'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    Icon: Lightbulb,
    title: 'Digital Solutions',
    description:
      'Helping small businesses and individuals establish their digital presence with professional websites and web tools.',
    features: ['Portfolio websites', 'Business landing pages', 'Admin dashboards', 'Contact form systems'],
    color: 'from-amber-500 to-orange-500',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Portfolio</title>
        <meta name="description" content="Services offered: web development, engineering consulting, technical training, and digital solutions." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">What I Offer</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              My <span className="text-cyan-500">Services</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
              I offer a range of services combining engineering knowledge and web development skills to deliver value.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map(({ Icon, title, description, features, color }, i) => (
              <motion.div
                key={title}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors">
                  {title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  {description}
                </p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
