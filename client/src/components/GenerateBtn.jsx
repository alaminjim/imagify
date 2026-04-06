import { assets } from "../../public/images/assets";
import { motion } from "motion/react";
import { useAuth } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
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
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center my-32 pb-24"
    >
      <h1 className="text-3xl md:text-5xl font-black mb-12 text-slate-900 text-center tracking-tight leading-tight">
        Ready to see the <br /> <span className="text-gradient">magic</span>? Try it now.
      </h1>

      <button
        onClick={handleOnClick}
        className="radiant-button group relative px-16 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black text-2xl overflow-hidden transition-all hover:pr-24 shadow-2xl shadow-indigo-500/20"
      >
        <span className="relative z-10">Start Creating Now</span>
        <img
          className="absolute right-8 top-1/2 -translate-y-1/2 w-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
          src={assets.star_group}
          alt=""
        />
      </button>

      <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
        No credit card required • Join 50k+ creators
      </p>
    </motion.div>
  );
};

export default GenerateBtn;
