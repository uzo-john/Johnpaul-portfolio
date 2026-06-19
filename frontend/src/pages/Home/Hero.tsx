import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code2, Briefcase, ChevronDown } from 'lucide-react';

const ROLES = ['Frontend Developer', 'Electrical Engineer', 'Smart Grid Enthusiast', 'Web App Builder', 'Automation Learner'];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const elRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let wordIdx = 0, charIdx = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const el = elRef.current;
      if (!el) return;
      const word = words[wordIdx];
      el.textContent = deleting ? word.slice(0, charIdx--) : word.slice(0, ++charIdx);
      if (!deleting && charIdx === word.length) {
        timer = setTimeout(() => { deleting = true; tick(); }, pause);
      } else if (deleting && charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        timer = setTimeout(tick, 300);
      } else {
        timer = setTimeout(tick, deleting ? speed / 2 : speed);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [words, speed, pause]);
  return elRef;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function Hero() {
  const typeRef = useTypewriter(ROLES);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-gray-950">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-cyan-500/30"
            initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh', opacity: 0 }}
            animate={{ y: [null, '-20vh'], opacity: [0, 0.7, 0] }}
            transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
          />
        ))}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full grid lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
        {/* Left Column: Text content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Open to opportunities — Recent Graduate
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Johnpaul Uzowuru
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-xl sm:text-2xl text-gray-300 mb-6 h-8">
            I'm a{' '}
            <span ref={typeRef} className="text-cyan-400 font-semibold border-r-2 border-cyan-400 pr-0.5" />
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-gray-400 max-w-xl mb-10 text-base sm:text-lg leading-relaxed">
            A recently graduated Electrical &amp; Electronics Engineer with a passion for frontend development, smart grid systems, and creating innovative digital solutions that solve real-world problems and drive meaningful impact.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
            <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200">
              View Projects <ArrowRight size={18} />
            </Link>
            <a href="/JOHNPAUL_UZOWURU_CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-700 text-gray-300 font-semibold hover:border-cyan-500 hover:text-cyan-500 hover:-translate-y-0.5 transition-all duration-200">
              Download CV <Download size={18} />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 hover:-translate-y-0.5 transition-all duration-200">
              Contact Me
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="flex gap-4">
            {[
              { href: 'https://github.com/uzo-john', Icon: Code2, label: 'GitHub' },
              { href: 'https://linkedin.com/in/johnpaul-uzowuru-952821253', Icon: Briefcase, label: 'LinkedIn' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-11 h-11 rounded-xl border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all duration-200 hover:-translate-y-0.5">
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Profile Picture with Motion Animations */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Rotating dashed ring */}
          <motion.div
            className="absolute rounded-full border-2 border-dashed border-cyan-500/30 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Pulsing glowing background blur */}
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 opacity-20 blur-2xl animate-pulse" />

          {/* Rounded Image Container */}
          <motion.div
            className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden border-4 border-cyan-500/20 shadow-2xl z-10"
            whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.4)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img
              src="/john_paul_profile.png"
              alt="John Paul Uzowuru"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
