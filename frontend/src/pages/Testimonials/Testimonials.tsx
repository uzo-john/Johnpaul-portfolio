import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { testimonialsApi } from '../../services/api';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsApi.getAll()
      .then(({ data }) => setTestimonials(data))
      .finally(() => setLoading(false));
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <>
      <Helmet>
        <title>Testimonials | Portfolio</title>
        <meta name="description" content="What colleagues, supervisors, and peers say about working with me." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">Kind Words</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
              What People <span className="text-cyan-500">Say</span>
            </h1>
          </motion.div>

          {loading ? (
            <div className="h-64 bg-white dark:bg-gray-900 rounded-2xl animate-pulse border border-gray-200 dark:border-gray-800" />
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-400">No testimonials yet.</p>
          ) : (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 shadow-sm text-center"
                >
                  <Quote size={40} className="text-cyan-500/30 mx-auto mb-6" />

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < testimonials[current].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-700'}
                      />
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed italic mb-8">
                    "{testimonials[current].content}"
                  </p>

                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonials[current].name}</p>
                    <p className="text-cyan-500 text-sm">{testimonials[current].role}</p>
                    {testimonials[current].company && (
                      <p className="text-gray-400 text-sm">{testimonials[current].company}</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              {testimonials.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-cyan-500 w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
                    />
                  ))}
                  <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
