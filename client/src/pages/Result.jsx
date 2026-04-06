import { useState } from "react";
import { assets } from "../../public/images/assets";
import { motion } from "motion/react";
import { useAuth } from "../context/AppContext";

const Result = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage, generatedImage, setGeneratedImage } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      await generateImage(input);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center pt-24 min-h-[80vh] px-6"
    >
      <div className="w-full max-w-2xl">
        <div className="relative group mb-8">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-square flex items-center justify-center">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 border-4 border-indigo-100 rounded-2xl"></div>
                  <motion.div
                    className="absolute inset-0 border-4 border-indigo-600 rounded-2xl border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                </div>
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-8 text-indigo-600 font-bold tracking-widest uppercase text-sm"
                >
                  Generating Magic...
                </motion.p>
              </div>
            ) : (
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {!loading && isImageLoaded && (
            <div className="absolute -bottom-4 right-8 flex gap-2">
              <a
                href={image}
                download
                className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {!isImageLoaded ? (
          <form
            onSubmit={onSubmitHandler}
            className="relative flex w-full max-w-2xl mx-auto bg-slate-900 p-2 rounded-full shadow-2xl overflow-hidden group focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all"
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe what you want to see..."
              className="flex-1 bg-transparent border-none outline-none text-white px-8 py-4 text-lg placeholder:text-slate-500 font-medium"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all active:scale-95"
            >
              Generate
            </button>
          </form>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsImageLoaded(false)}
              className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-bold hover:bg-slate-50 transition-all"
            >
              Generate Another
            </button>
            <a
              href={image}
              download
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:shadow-xl hover:shadow-indigo-500/20 transition-all"
            >
              Download Artwork
            </a>
          </div>
        )}
      </div>

      {!isImageLoaded && (
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <p className="w-full text-center text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">
            Try these prompts
          </p>
          {["Cyberpunk forest in rain", "Minimalist space explorer", "Surreal crystal mountain"].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-all"
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
