import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, Target, Download, MapPin, Calendar, Award } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' as const } }),
};

const highlights = [
  { label: 'Location', value: 'Nigeria', Icon: MapPin },
  { label: 'Graduated', value: '2024', Icon: Calendar },
  { label: 'Focus', value: 'Web Dev + EEE', Icon: Target },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Me | Portfolio</title>
        <meta name="description" content="Learn about my background in Electrical Engineering, web development skills, and career goals." />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">Get To Know Me</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">About <span className="text-cyan-500">Me</span></h1>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Column: Image with animated frame and glows */}
            <motion.div
              className="lg:col-span-5 flex justify-center relative"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            >
              {/* Spinning design ring */}
              <motion.div
                className="absolute rounded-full border-2 border-dashed border-cyan-500/20 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glowing behind image */}
              <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 opacity-10 blur-xl animate-pulse" />

              <motion.div
                className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-2xl overflow-hidden border-4 border-cyan-500/10 shadow-2xl z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img
                  src="/john_paul_profile.png"
                  alt="John Paul Uzowuru"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right Column: Bio */}
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">A Passionate Engineer &amp; Developer</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  I am a proactive and results-driven engineer, with a strong passion for leadership, teamwork, and continuous growth. Through executive roles and technical projects, I have developed the ability to coordinate teams, communicate effectively, and drive initiative to completion.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  With a solid foundation in Electrical and Electronic Engineering and hands-on experience in control system and automation at Yokogawa Nigeria Limited, I bring strong analytical and system-thinking skills to problem-solving.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I am building my career as a full stack software Engineer, with experiences developing responsive application using HTML, CSS, JAVASCRIPT, VUE.JS and REACT.JS frame-work, alongside foundational knowledge in Python, C language and shell scripting. I am committed to leveraging engineering principles and modern software development to deliver innovative an impactful solution.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Grid: Highlights & Education */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Highlights & Download */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }} className="grid grid-cols-3 gap-4">
                {highlights.map(({ label, value, Icon }) => (
                  <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700/50">
                    <Icon size={22} className="text-cyan-500 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
              <div className="text-center lg:text-left">
                <motion.a variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
                  href="/JOHNPAUL_UZOWURU_CV.pdf" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200">
                  <Download size={18} /> Download Resume / CV
                </motion.a>
              </div>
            </div>

            {/* Education & Goals */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">B.Eng. Electrical &amp; Electronics Engineering</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Niger Delta University (NDU)</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="px-4.5 py-1 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-medium whitespace-nowrap">2020 – 2025</span>
                      <span className="px-4.5 py-1 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full text-xs font-medium whitespace-nowrap">Second Class Upper (GPA: 4.01)</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">West African Senior School Certificate (WAEC)</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Irvington College, Lagos</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="px-4.5 py-1 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-medium whitespace-nowrap">2016 – 2018</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={0.8} viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Award size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Certifications &amp; Training</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">ALX Software Engineering Program</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                        Completed intensive training in software development, earning a professional certificate. Focused on building scalable applications, version control, and collaborative coding practices.
                      </p>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800/80 pt-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Udemy Web Development Bootcamp</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                        Mastered frontend technologies through hands-on projects, emphasizing modern web standards and user interface design.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1.2} viewport={{ once: true }}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl p-6 border border-cyan-100 dark:border-cyan-900/50">
                <div className="flex items-center gap-3 mb-3">
                  <Target size={20} className="text-cyan-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Career Goals</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  To work at the intersection of engineering and software — building smart, data-driven web applications for industries like energy, automation, and IoT. Aiming to grow into a full-stack or solutions engineer role within 2–3 years.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
