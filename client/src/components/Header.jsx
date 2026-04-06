import { assets } from "../../public/images/assets";
import { motion } from "motion/react";
import { useAuth } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center pt-32 pb-20 md:pt-48 md:pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8"
      >
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          The Future of Creativity is Here
        </p>
        <img src={assets.star_icon} alt="" className="w-3" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 max-w-4xl leading-[1.1]"
      >
        Turn text into <br />
        <span className="text-gradient">
          visual magic
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mt-8 leading-relaxed font-medium"
      >
        Unleash your creativity with our state-of-the-art AI. From abstract concepts
        to photorealistic art, if you can type it, we can generate it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-12"
      >
        <button
          onClick={handleOnClick}
          className="radiant-button group relative px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-14"
        >
          <span className="relative z-10">Start Generating</span>
          <img
            className="absolute right-5 top-1/2 -translate-y-1/2 w-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
            src={assets.star_group}
            alt=""
          />
        </button>
        <button
          onClick={() => navigate("/buy")}
          className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-sm"
        >
          View Pricing
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 w-full max-w-5xl"
      >
        <div className="flex flex-wrap justify-center gap-6">
          {[assets.sample_img_1, assets.sample_img_2, assets.sample_img_1, assets.sample_img_2, assets.sample_img_1, assets.sample_img_2].map((img, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 2 : -2 }}
              className="relative group cursor-pointer"
            >
              <img
                className="rounded-3xl shadow-2xl w-24 md:w-32 lg:w-44 object-cover aspect-[4/5] border-4 border-white"
                src={img}
                alt=""
              />
              <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl backdrop-blur-[2px]"></div>
            </motion.div>
          ))}
        </div>
        <p className="mt-12 text-sm font-bold text-slate-400 uppercase tracking-widest">
          Trusted by 50,000+ creators globally
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Header;
