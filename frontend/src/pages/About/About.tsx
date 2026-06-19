import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, Target, Download, MapPin, Calendar, Award, Cpu, Code2, Shield, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } 
  }),
};

const stats = [
  { label: 'Location', value: 'Nigeria', sub: 'Open to Relocate', Icon: MapPin, color: 'from-cyan-500 to-blue-500' },
  { label: 'Education', value: 'B.Eng Graduate', sub: 'Class of 2025', Icon: GraduationCap, color: 'from-blue-500 to-purple-500' },
  { label: 'Specialization', value: 'Software + EEE', sub: 'Full-Stack Developer', Icon: Cpu, color: 'from-purple-500 to-pink-500' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Me | Portfolio</title>
        <meta name="description" content="Learn about my background in Electrical Engineering, software development, and career goals." />
      </Helmet>

      <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-gray-950 text-gray-300">
        {/* Engineering Tech Grid & Radial backdrops */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293718_1px,transparent_1px),linear-gradient(to_bottom,#1f293718_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles size={12} className="animate-spin" /> Discovery
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
              About <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Me</span>
            </h1>
          </motion.div>

          {/* Profile & Biography */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Left Column: Photo Card with Offset Glow Frame */}
            <motion.div 
              className="lg:col-span-5 flex justify-center relative group"
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              custom={0}
            >
              {/* Back offset glow */}
              <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl -translate-x-4 translate-y-4 opacity-25 blur-sm group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
              
              {/* Spinning ring container */}
              <motion.div
                className="absolute rounded-3xl border border-dashed border-cyan-500/25 w-[250px] h-[250px] sm:w-[320px] sm:h-[320px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />

              {/* Photo Box */}
              <motion.div 
                className="relative w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/60 shadow-2xl z-10 p-2.5 backdrop-blur-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <img 
                  src="/john_paul_profile.png" 
                  alt="Johnpaul Uzowuru" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Right Column: Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                custom={1}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <p className="text-cyan-400 font-semibold text-sm tracking-wider uppercase">Introduction</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Bridging Software Engineering &amp; Electrical Automation
                  </h2>
                </div>
                <p className="text-gray-400 leading-relaxed text-base">
                  I am a proactive and results-driven engineer, with a strong passion for leadership, teamwork, and continuous growth. Through executive roles and technical projects, I have developed the ability to coordinate teams, communicate effectively, and drive initiatives to completion.
                </p>
                <p className="text-gray-400 leading-relaxed text-base">
                  With a solid foundation in Electrical and Electronic Engineering and hands-on experience in control systems and automation at <span className="text-white font-medium">Yokogawa Nigeria Limited</span>, I bring strong analytical and systems-thinking skills to complex software architectures.
                </p>
                <p className="text-gray-400 leading-relaxed text-base">
                  I am building my career as a full-stack Software Engineer, developing responsive applications using HTML, CSS, JavaScript, Vue.js, and React.js, alongside foundational knowledge in Python, C, and shell scripting. I am committed to leveraging engineering principles to deliver innovative, scalable software solutions.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            custom={2} 
            className="grid sm:grid-cols-3 gap-6 mb-20"
          >
            {stats.map(({ label, value, sub, Icon, color }) => (
              <div 
                key={label} 
                className="group relative bg-gray-900/40 border border-gray-800/80 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-gray-900/60 transition-all duration-300 backdrop-blur-xl"
              >
                {/* Glowing border accent */}
                <div className={`absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r ${color} opacity-30 group-hover:opacity-100 transition-opacity`} />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{label}</p>
                    <p className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors mt-0.5">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bottom Grid: Educational Timeline & Certifications */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Timeline Column (Education) */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <GraduationCap size={16} />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Education Journey</h2>
              </motion.div>

              <div className="relative pl-6 border-l border-gray-800/80 space-y-8 ml-3">
                {/* University Degree */}
                <motion.div 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  custom={0}
                  className="relative group"
                >
                  {/* Timeline Point */}
                  <div className="absolute w-4 h-4 rounded-full bg-gray-950 border-2 border-cyan-500 -left-[35px] top-1 group-hover:scale-125 group-hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  
                  <div className="bg-gray-900/30 border border-gray-900 rounded-2xl p-5 hover:border-gray-800 hover:bg-gray-900/40 transition-all">
                    <span className="inline-block px-2.5 py-0.5 bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-semibold mb-3">
                      2020 – 2025
                    </span>
                    <h3 className="font-bold text-white text-base">B.Eng. Electrical &amp; Electronics Engineering</h3>
                    <p className="text-gray-400 text-sm mt-1">Niger Delta University (NDU)</p>
                    <div className="flex flex-wrap gap-2.5 mt-3">
                      <span className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-lg text-xs font-medium whitespace-nowrap">
                        Second Class Upper (GPA: 4.01)
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* WAEC High School */}
                <motion.div 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  custom={0.5}
                  className="relative group"
                >
                  {/* Timeline Point */}
                  <div className="absolute w-4 h-4 rounded-full bg-gray-950 border-2 border-cyan-500 -left-[35px] top-1 group-hover:scale-125 group-hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  
                  <div className="bg-gray-900/30 border border-gray-900 rounded-2xl p-5 hover:border-gray-800 hover:bg-gray-900/40 transition-all">
                    <span className="inline-block px-2.5 py-0.5 bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-semibold mb-3">
                      2016 – 2018
                    </span>
                    <h3 className="font-bold text-white text-base">West African Senior School Certificate (WAEC)</h3>
                    <p className="text-gray-400 text-sm mt-1">Irvington College, Lagos</p>
                  </div>
                </motion.div>
              </div>

              {/* Glowing Resume Download Card */}
              <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                custom={1}
                className="pt-4"
              >
                <a 
                  href="/JOHNPAUL_UZOWURU_CV.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between w-full p-4 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Download size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">Download Resume / CV</p>
                      <p className="text-xs text-gray-400 mt-0.5">PDF format — 80KB</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <Download size={14} />
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Certifications & Goals Column */}
            <div className="lg:col-span-6 space-y-8">
              {/* Certifications & Training Card */}
              <div className="space-y-4">
                <motion.div 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Award size={16} />
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Certifications &amp; Training</h2>
                </motion.div>

                <motion.div 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  custom={0.8}
                  className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-5"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center flex-shrink-0 text-purple-400">
                      <Code2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">ALX Software Engineering Program</h4>
                      <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                        Completed intensive training in software development, earning a professional certificate. Focused on building scalable applications, version control, and collaborative coding practices.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-800/80 pt-5 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center flex-shrink-0 text-blue-400">
                      <Code2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Udemy Web Development Bootcamp</h4>
                      <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                        Mastered frontend technologies through hands-on projects, emphasizing modern web standards and user interface design.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Career Goals Card */}
              <div className="space-y-4">
                <motion.div 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                    <Target size={16} />
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Career Target</h2>
                </motion.div>

                <motion.div 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  custom={1.2}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-900/35 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-xl flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center flex-shrink-0 text-green-400">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Future Vision</h4>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                      To work at the intersection of engineering and software — building smart, data-driven web applications for industries like energy, automation, and IoT. Aiming to grow into a full-stack or solutions engineer role within 2–3 years.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
