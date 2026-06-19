import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Award, Users } from 'lucide-react';

const experiences = [
  {
    type: 'internship',
    title: 'Electrical Engineering Intern',
    organization: 'Power Infrastructure Company',
    location: 'Nigeria',
    period: 'Jul 2023 – Sep 2023',
    icon: Briefcase,
    color: 'from-cyan-500 to-blue-500',
    highlights: [
      'Assisted in routine maintenance and inspection of distribution transformers (11kV/415V)',
      'Participated in SCADA data monitoring sessions for power flow analysis',
      'Contributed to technical report writing for equipment fault logs',
      'Learned on-site safety protocols and standard engineering practices',
    ],
  },
  {
    type: 'leadership',
    title: 'Class Representative',
    organization: 'Department of Electrical & Electronics Engineering',
    location: 'University',
    period: '2022 – 2024',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    highlights: [
      'Served as liaison between 120+ students and department faculty',
      'Organized study groups and peer-learning sessions for core engineering courses',
      'Coordinated departmental events including technical workshops',
      'Improved communication and leadership skills through real-world responsibility',
    ],
  },
  {
    type: 'achievement',
    title: 'Best Final Year Project — Power Systems',
    organization: 'Department Award',
    location: 'University',
    period: '2024',
    icon: Award,
    color: 'from-amber-500 to-orange-500',
    highlights: [
      'Awarded for outstanding final year project on Automatic Power Factor Correction',
      'Project demonstrated measurable improvement in load power factor (from 0.7 to 0.96)',
      'Received commendation from external examiner for quality of simulation and documentation',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { delay: i * 0.15, duration: 0.55 } }),
};

export default function Experience() {
  return (
    <>
      <Helmet>
        <title>Experience | Portfolio</title>
        <meta name="description" content="Internship experience, leadership roles, and academic achievements." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">Where I've Been</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              Experience &amp; <span className="text-cyan-500">Achievements</span>
            </h1>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-10">
              {experiences.map(({ title, organization, location, period, icon: Icon, color, highlights }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className={`absolute left-0 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>

                  {/* Card */}
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
                        <p className="text-cyan-500 font-medium text-sm">{organization}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{location}</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded-full font-medium">
                        {period}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-4">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
