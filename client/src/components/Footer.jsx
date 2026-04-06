import { assets } from "../../public/images/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center justify-between py-8 border-t border-slate-200 mt-20 gap-6">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="logo" className="w-28 opacity-80" />
        <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>
        <p className="text-sm text-slate-500">
          © 2026 Imagify AI. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-6">
        {[assets.facebook_icon, assets.twitter_icon, assets.instagram_icon].map(
          (icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:invert transition-all duration-300 shadow-sm"
            >
              <img src={icon} alt="" className="w-5" />
            </motion.a>
          )
        )}
      </div>
    </footer>
  );
};

export default Footer;
