import { useState } from "react";
import { assets } from "../../public/images/assets";
import { motion } from "motion/react";
import { useAuth } from "../context/AppContext";

const Result = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { generateImage, generatedImage, setGeneratedImage } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setGeneratedImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center pt-24 min-h-[90vh] px-6"
    >
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-12 text-slate-900 tracking-tight">
          Your <span className="text-gradient">Creation</span>
        </h1>
        
        <div className="relative group mb-12">
          <div className="relative rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border-8 border-white bg-white aspect-square flex items-center justify-center">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-md">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 border-8 border-indigo-100 rounded-[2rem]"></div>
                  <motion.div
                    className="absolute inset-0 border-8 border-indigo-600 rounded-[2rem] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                </div>
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mt-10 text-indigo-600 font-black tracking-[0.2em] uppercase text-xs"
                >
                  Generating Masterpiece...
                </motion.p>
              </div>
            ) : (
              <img
                src={generatedImage || assets.sample_img_1}
                alt="AI Generated"
                className={`w-full h-full object-cover transition-all duration-1000 ${loading ? 'blur-lg scale-110' : 'blur-0 scale-100'}`}
              />
            )}
          </div>

          {!loading && isImageLoaded && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-6 right-10 flex gap-3"
            >
              <a
                href={generatedImage}
                download
                className="radiant-button p-5 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>
          )}
        </div>

        {!isImageLoaded ? (
          <form
            onSubmit={onSubmitHandler}
            className="group relative flex w-full max-w-2xl mx-auto bg-slate-900 p-2.5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all overflow-hidden focus-within:ring-4 focus-within:ring-indigo-500/20"
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="A futuristic city with purple neon lights..."
              className="flex-1 bg-transparent border-none outline-none text-white px-8 py-5 text-lg placeholder:text-slate-500 font-bold"
            />
            <button
              type="submit"
              disabled={loading || !input}
              className="radiant-button bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg disabled:opacity-50"
            >
              {loading ? "..." : "Generate"}
            </button>
          </form>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => { setIsImageLoaded(false); setGeneratedImage(null); }}
              className="px-10 py-5 bg-white border-4 border-slate-900 text-slate-900 rounded-[2rem] font-black text-lg hover:bg-slate-50 transition-all shadow-xl active:scale-95"
            >
              Generate Another
            </button>
            <a
              href={generatedImage}
              download
              className="radiant-button px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl"
            >
              Download Art
            </a>
          </div>
        )}
      </div>

      {!isImageLoaded && (
        <div className="mt-16 flex flex-wrap justify-center gap-4 max-w-3xl">
          <p className="w-full text-center text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.3em]">
            Inspiration
          </p>
          {["Cyberpunk forest in rain", "Minimalist space explorer", "Surreal crystal mountain", "Neon organic architecture"].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-6 py-3 bg-white/50 backdrop-blur-xl text-slate-600 rounded-2xl text-sm font-bold border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Result;
