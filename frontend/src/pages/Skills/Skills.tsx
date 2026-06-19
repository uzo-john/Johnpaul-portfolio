import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Code2, Terminal, Users, Sparkles, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } 
  }),
};

const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Building interactive, responsive, and pixel-perfect user interfaces.',
    icon: Code2,
    color: 'from-cyan-500 to-blue-500',
    accentColor: 'text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    skills: [
      { name: 'React / JSX', level: 80 },
      { name: 'JavaScript (ES6+)', level: 82 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 78 },
      { name: 'Responsive Design', level: 85 },
    ],
  },
  {
    title: 'Backend & DevTools',
    description: 'Developing application logic, managing workflows, and managing databases.',
    icon: Terminal,
    color: 'from-green-500 to-emerald-500',
    accentColor: 'text-green-500 dark:text-green-400 bg-green-500/10 border-green-500/20',
    skills: [
      { name: 'Node.js / NestJS', level: 68 },
      { name: 'Git / GitHub', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Linux CLI', level: 60 },
    ],
  },
  {
    title: 'Soft Skills',
    description: 'Enabling effective collaboration, problem-solving, and communication.',
    icon: Users,
    color: 'from-orange-500 to-amber-500',
    accentColor: 'text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/20',
    skills: [
      { name: 'Problem Solving', level: 88 },
      { name: 'Team Collaboration', level: 85 },
      { name: 'Technical Writing', level: 78 },
      { name: 'Communication', level: 80 },
      { name: 'Self-Learning', level: 92 },
      { name: 'Time Management', level: 76 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08 + 0.15, duration: 0.4, ease: 'easeOut' }}
      className="mb-5 group/skill"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-cyan-500 opacity-60 group-hover/skill:opacity-100 transition-opacity" />
          {name}
        </span>
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-100 dark:border-cyan-900/30">
          {level}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 dark:bg-gray-800/80 rounded-full overflow-hidden relative shadow-inner">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: delay * 0.08 + 0.25, ease: 'easeOut' }}
        />
        {/* Hover overlay highlights */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <>
      <Helmet>
        <title>Skills | Portfolio</title>
        <meta name="description" content="Technical skills in frontend development, electrical engineering tools, automation, and backend technologies." />
      </Helmet>
      
      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-transparent text-gray-700 dark:text-gray-300">
        {/* Grid and Radial backdrops */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles size={12} className="animate-spin" /> Expertise
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
              Skills &amp; <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Capabilities</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-base sm:text-lg">
              A blend of modern software development disciplines, backend devtools, and essential soft skills.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map(({ title, description, icon: Icon, color, accentColor, skills }, i) => (
              <motion.div 
                key={title} 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                custom={i * 0.1}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/60 dark:to-gray-900/35 border border-gray-200 dark:border-gray-800/80 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-white dark:hover:bg-gray-900/60 transition-all duration-300 backdrop-blur-xl shadow-sm dark:shadow-none"
              >
                {/* Glowing border accent */}
                <div className={`absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r ${color} opacity-30 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${accentColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{title}</h2>
                  </div>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 h-12">
                  {description}
                </p>

                <div className="space-y-4">
                  {skills.map(({ name, level }, idx) => (
                    <SkillBar key={name} name={name} level={level} color={color} delay={idx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
