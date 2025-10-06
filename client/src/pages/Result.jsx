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
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="relative">
        <img
          src={generatedImage || assets.sample_img_1}
          alt="Generated"
          className="max-w-sm rounded"
        />
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
            loading ? "w-full transition-all duration-[10s]" : "w-0"
          }`}
        />
      </div>

      {loading && <p>Loading....</p>}

      {!generatedImage && (
        <div className="w-full flex max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {generatedImage && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={handleReset}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={generatedImage}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
