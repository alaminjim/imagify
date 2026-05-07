import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqData = [
  {
    question: "How does Imagify work?",
    answer: "Imagify uses advanced AI models to transform your text descriptions into stunning, high-resolution images in seconds. Simply type what you want to see, and our AI does the rest."
  },
  {
    question: "What are credits used for?",
    answer: "Each image generation costs 1 credit. We provide 5 free credits to get you started. You can purchase more credits anytime to keep creating."
  },
  {
    question: "Can I use the images commercially?",
    answer: "Yes! All images generated through Imagify belong to you, and you have full commercial rights to use them for any project, including marketing, social media, and products."
  },
  {
    question: "How do I get more credits?",
    answer: "You can easily buy credit bundles from our 'Buy Credits' page. We offer various plans to suit your creative needs, from basic sets to high-volume business plans."
  },
  {
    question: "What makes Imagify different?",
    answer: "Imagify focuses on speed, ease of use, and premium quality. Our interface is designed to be intuitive, and our AI models are optimized for artistic excellence and visual impact."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 px-6 md:px-0"
    >
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Got <span className="text-gradient">Questions?</span>
        </h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm">
          Everything you need to know about Imagify
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={false}
            className={`border-2 rounded-[2rem] overflow-hidden transition-all duration-500 ${
              activeIndex === index 
                ? 'border-indigo-500 bg-white shadow-2xl shadow-indigo-500/10 scale-[1.02]' 
                : 'border-slate-100 bg-slate-50/30 hover:border-slate-200'
            }`}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
            >
              <span className={`text-sm md:text-lg font-bold transition-colors duration-300 ${
                activeIndex === index ? 'text-indigo-600' : 'text-slate-800'
              }`}>
                {item.question}
              </span>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeIndex === index ? 'bg-indigo-600 rotate-45' : 'bg-slate-200 rotate-0'
              }`}>
                <svg 
                  className={`w-4 h-4 transition-colors duration-500 ${activeIndex === index ? 'text-white' : 'text-slate-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="px-8 pb-6 text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
