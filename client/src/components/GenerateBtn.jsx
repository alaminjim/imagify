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
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 pb-16"
    >
      <h1 className="text-3xl sm:text-5xl font-black mb-10 text-slate-900 text-center">
        See the magic. Try now
      </h1>

      <button
        onClick={handleOnClick}
        className="group relative px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-xl overflow-hidden shadow-2xl hover:shadow-indigo-500/20 transition-all hover:pr-16"
      >
        <span className="relative z-10">Generate Images</span>
        <img
          className="absolute right-6 top-1/2 -translate-y-1/2 w-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
          src={assets.star_group}
          alt=""
        />
      </button>

      <p className="mt-8 text-slate-400 font-medium">
        Join 50k+ creators. No credit card required.
      </p>
    </motion.div>
  );
};

export default GenerateBtn;
