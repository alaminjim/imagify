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
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-12 text-lg">
        Turn your imagination into visuals
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24 w-full max-w-6xl">
        <div className="relative group">
          <img
            src={assets.sample_img_1}
            alt=""
            className="w-80 xl:w-96 rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/10 backdrop-blur-xl rounded-full -z-10 animate-pulse"></div>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            Introducing the AI-Powered <br />
            <span className="text-indigo-600">Text-to-Image</span> Generator
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Easily bring your wildest ideas to life with our free AI image
            generator. Whether you need stunning visuals for your next project,
            social media content, or just want to experiment, our tool makes it
            seamless.
          </p>
          <p className="text-slate-500 leading-relaxed">
            From photorealistic portraits to abstract digital art, our advanced
            algorithms understand your prompts and deliver high-quality results
            in seconds.
          </p>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="group flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
          >
            Learn more about our technology
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
