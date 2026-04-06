import { assets } from "../../public/images/assets";
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">
        Create AI <span className="text-gradient">Images</span>
      </h1>
      <p className="text-slate-500 mb-16 text-lg font-medium uppercase tracking-widest">
        Turn your imagination into visuals
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24 w-full max-w-6xl">
        <div className="relative group">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl -z-10"
          ></motion.div>
          <img
            src={assets.sample_img_1}
            alt=""
            className="w-80 xl:w-96 rounded-[3rem] shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 border-8 border-white"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl -z-10"
          ></motion.div>
        </div>
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Introducing the AI-Powered <br />
            <span className="text-gradient text-3xl md:text-4xl">Text-to-Image</span> Generator
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg font-medium">
            Easily bring your wildest ideas to life with our free AI image
            generator. Whether you need stunning visuals for your next project,
            social media content, or just want to experiment, our tool makes it
            seamless.
          </p>
          <p className="text-slate-500 leading-relaxed font-medium">
            From photorealistic portraits to abstract digital art, our advanced
            algorithms understand your prompts and deliver high-quality results
            in seconds.
          </p>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="group flex items-center justify-center md:justify-start gap-3 text-indigo-600 font-black text-lg hover:text-indigo-700 transition-colors"
          >
            Learn more about our technology
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
