import { assets } from "../../public/images/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center justify-between py-12 border-t border-slate-100 mt-32 gap-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img src={assets.logo} alt="logo" className="w-32 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
        <div className="h-6 w-[2px] bg-slate-100 hidden sm:block"></div>
        <p className="text-sm font-bold text-slate-400 tracking-tight uppercase">
          © 2026 Imagify AI. <span className="text-slate-200">Powered by Innovation.</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        {[assets.facebook_icon, assets.twitter_icon, assets.instagram_icon].map((icon, index) => (
          <motion.a
            key={index}
            href="#"
            whileHover={{ y: -5, scale: 1.1, backgroundColor: "#0f172a", filter: "invert(1)" }}
            className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
          >
            <img src={icon} alt="" className="w-5 opacity-50" />
          </motion.a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
