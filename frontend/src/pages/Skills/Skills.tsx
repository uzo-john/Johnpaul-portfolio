import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const skillCategories = [
  {
    title: 'Frontend Development',
    color: 'from-cyan-500 to-blue-500',
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
    title: 'Engineering Tools',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'MATLAB / Simulink', level: 75 },
      { name: 'AutoCAD Electrical', level: 65 },
      { name: 'SIMATIC Step 7 (PLC)', level: 60 },
      { name: 'Circuit Design', level: 78 },
      { name: 'Power Systems Analysis', level: 72 },
      { name: 'SCADA / HMI', level: 58 },
    ],
  },
  {
    title: 'Backend & DevTools',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js / NestJS', level: 68 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'REST APIs', level: 75 },
      { name: 'Git / GitHub', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Linux CLI', level: 60 },
    ],
  },
  {
    title: 'Soft Skills',
    color: 'from-orange-500 to-amber-500',
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
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={delay} viewport={{ once: true }} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay * 0.08, ease: 'easeOut' }}
        />
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
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">What I Know</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              Skills &amp; <span className="text-cyan-500">Expertise</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
              A blend of engineering fundamentals and modern web development skills — built through coursework, self-study, and real projects.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map(({ title, color, skills }) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`} />
                  <h2 className="font-bold text-gray-900 dark:text-white">{title}</h2>
                </div>
                {skills.map(({ name, level }, i) => (
                  <SkillBar key={name} name={name} level={level} color={color} delay={i} />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
