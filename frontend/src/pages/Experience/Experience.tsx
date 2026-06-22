import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Users, Shield, Calendar, MapPin, GraduationCap, Sparkles } from 'lucide-react';

const experiences = [
  {
    category: 'professional',
    type: 'Work Experience',
    title: 'Electrical Engineer (Volunteering)',
    organization: 'Bartum Energy',
    location: 'Bayelsa State, Nigeria',
    period: 'Feb 2026 – Present',
    icon: Briefcase,
    color: 'from-cyan-500 to-blue-500',
    typeColor: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20 dark:text-cyan-400 dark:bg-cyan-950/40 dark:border-cyan-900/30',
    highlights: [
      'Support the design, installation, and supervision of photovoltaic (PV) solar systems, ensuring proper panel placement.',
      'Configure inverters and ensure safe, compliant electrical connections.',
      'Collaborate with senior engineers and technicians to maintain high technical standards, comply with safety regulations, and optimize system performance.',
    ],
  },
  {
    category: 'professional',
    type: 'Internship',
    title: 'Control Systems Specialist (Internship)',
    organization: 'Yokogawa Nigeria Limited',
    location: 'Lagos, Nigeria',
    period: 'Nov 2024 – Apr 2025',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-500',
    typeColor: 'text-blue-600 bg-blue-500/10 border-blue-500/20 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/30',
    highlights: [
      "Configured and programmed Distributed Control Systems (DCS) using Yokogawa's Centum VP platform, implementing control logic that enhanced process automation and reduced system response times by 15%.",
      'Conducted testing, troubleshooting, and maintenance of control equipment, minimizing operational downtime by 20% during simulated and live environments.',
      'Collaborated with engineering teams to develop and simulate control strategies, ensuring compliance with industry standards for safety and efficiency.',
      'Assisted in the integration of software modules with hardware interfaces, bridging electrical engineering and software engineering principles.',
    ],
  },
  {
    category: 'professional',
    type: 'Work Experience',
    title: 'Production and Delivery Operator',
    organization: 'Indomie Foods Group',
    location: 'Lagos, Nigeria',
    period: 'Jul 2019 – Mar 2020',
    icon: Briefcase,
    color: 'from-teal-500 to-emerald-500',
    typeColor: 'text-teal-600 bg-teal-500/10 border-teal-500/20 dark:text-teal-400 dark:bg-teal-950/40 dark:border-teal-900/30',
    highlights: [
      'Managed end-to-end production cycles, implementing quality assurance protocols that decreased product defects by 15% and ensured compliance with industry standards.',
      'Coordinated logistics and delivery operations for daily shipments, improving route efficiency and achieving a 25% reduction in delivery delays through data-driven planning.',
      'Trained and mentored junior staff on operational procedures, boosting overall team productivity by 10% and contributing to a safer, more reliable work environment.',
    ],
  },
  {
    category: 'leadership',
    type: 'Leadership',
    title: 'Vice President & PRO',
    organization: 'NIEEE Student Chapter, Niger Delta University',
    location: 'Bayelsa State, Nigeria',
    period: '2023 – 2025',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    typeColor: 'text-purple-600 bg-purple-500/10 border-purple-500/20 dark:text-purple-400 dark:bg-purple-950/40 dark:border-purple-900/30',
    highlights: [
      'Served as a two times Vice President (2024 & 2025) and Public Relations Officer (2023) for the student chapter of the Nigerian Institute of Electrical and Electronic Engineers (NIEEE).',
      'Coordinated departmental events, technical workshops, and peer-learning programs for engineering students.',
      'Represented the student body to build stronger faculty relations and facilitate communication.',
    ],
  },
  {
    category: 'academic',
    type: 'Education & Academic Award',
    title: 'B.Sc. Graduation & Smart Grid Project',
    organization: 'Niger Delta University',
    location: 'Bayelsa State, Nigeria',
    period: '2025',
    icon: GraduationCap,
    color: 'from-amber-500 to-orange-500',
    typeColor: 'text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/30',
    highlights: [
      'Graduated with a B.Sc. in Electrical and Electronic Engineering (July 2020 – July 2025).',
      'Final Year Project: Developed a MATLAB simulation of a Smart Grid Control System for Power Distribution, bridging hardware knowledge with software applications.',
      'Studied relevant coursework in Circuit Design, Programming Fundamentals, and Digital Systems.',
    ],
  },
  {
    category: 'leadership',
    type: 'Volunteering',
    title: 'Event Volunteer',
    organization: 'Bayelsa Expo',
    location: 'Bayelsa State, Nigeria',
    period: 'Volunteer',
    icon: Users,
    color: 'from-rose-500 to-rose-600',
    typeColor: 'text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/30',
    highlights: [
      'Coordinated setup and guest services for a large-scale event, managing logistics for 300+ attendees and ensuring smooth operations through effective teamwork and quick problem resolution.',
      'Contributed to community engagement initiatives, enhancing organizational skills transferable to agile software development teams.',
    ],
  },

];


const memberships = [
  {
    organization: 'Nigerian Institute of Electrical and Electronic Engineers (NIEEE)',
    role: 'Student Member',
  },
  {
    organization: 'Institute of Engineering Technology (IET)',
    role: 'Student Member',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'professional', label: 'Engineering' },
    { id: 'leadership', label: 'Leadership & Volunteering' },
    { id: 'academic', label: 'Education & Projects' },
  ];

  const filteredExperiences = activeTab === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === activeTab);

  return (
    <>
      <Helmet>
        <title>Experience | Portfolio</title>
        <meta name="description" content="Professional internship experience, leadership roles, and academic achievements." />
      </Helmet>

      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-transparent text-gray-700 dark:text-gray-300">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles size={12} className="animate-pulse" /> My Journey
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
              Experience &amp; <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Achievements</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-base sm:text-lg">
              A timeline of my professional training, engineering projects, leadership, and volunteering.
            </p>
          </motion.div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 bg-gray-100/50 dark:bg-gray-950/45 p-1.5 rounded-xl border border-gray-200/50 dark:border-gray-800/80 backdrop-blur-md max-w-2xl mx-auto">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === id
                    ? 'text-cyan-600 dark:text-cyan-400 shadow-sm bg-white dark:bg-gray-900 border border-gray-200/30 dark:border-gray-700/30'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-20 dark:opacity-30" />

            <div className="space-y-12">
              <AnimatePresence mode="popLayout">
                {filteredExperiences.map(({ title, organization, location, period, icon: Icon, color, typeColor, type, highlights }) => (
                  <motion.div
                    key={title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative pl-16"
                  >
                    {/* Dot container */}
                    <div className="absolute left-0 top-1 w-12 h-12 flex items-center justify-center">
                      {/* Pulse effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-10 animate-ping rounded-xl`} />
                      {/* Inner dot */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg relative z-10`}>
                        <Icon size={18} className="text-white" />
                      </div>
                    </div>

                    {/* Timeline card */}
                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-gray-800/80 p-6 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:bg-white dark:hover:bg-gray-900/80 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          {/* Type Badge */}
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeColor} mb-2`}>
                            {type}
                          </span>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{title}</h2>
                          <p className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm mt-0.5">{organization}</p>
                        </div>

                        <div className="flex flex-col sm:items-end gap-1.5 text-gray-500 dark:text-gray-400 text-xs mt-1">
                          <span className="flex items-center gap-1.5 font-medium bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1 rounded-full">
                            <Calendar size={13} className="text-cyan-500" />
                            {period}
                          </span>
                          <span className="flex items-center gap-1.5 pl-1 sm:pl-0">
                            <MapPin size={13} className="text-gray-400" />
                            {location}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mt-4 border-t border-gray-100 dark:border-gray-800/50 pt-4">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Memberships Section */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-28 text-center mb-10"
          >
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">Affiliations</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Memberships</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {memberships.map(({ organization, role }, i) => (
              <motion.div
                key={organization}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
                className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-gray-800/80 p-6 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:bg-white dark:hover:bg-gray-900/80 transition-all duration-300 shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/20">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug">{organization}</h3>
                  <p className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm mt-1">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
