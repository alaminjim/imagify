import { assets } from "../../public/images/assets";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Home", path: "/" },
      { name: "AI Generator", path: "/result" },
      { name: "Pricing", path: "/buy" },
      { name: "Showcase", path: "/#description" },
    ],
    company: [
      { name: "About Us", path: "/#steps" },
      { name: "Terms of Service", path: "#" },
      { name: "Privacy Policy", path: "#" },
      { name: "Support", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: assets.facebook_icon, name: "Facebook" },
    { icon: assets.twitter_icon, name: "Twitter" },
    { icon: assets.instagram_icon, name: "Instagram" },
  ];

  return (
    <footer className="w-full mt-32 relative overflow-hidden">
      {/* Top Border Gradient Decoration */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8">
            <Link to="/" onClick={() => window.scrollTo(0,0)}>
              <img src={assets.logo} alt="logo" className="w-40 hover:opacity-80 transition-opacity" />
            </Link>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
              Empowering creators worldwide with state-of-the-art AI. Turn your wildest imaginations into high-resolution masterpieces.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: "#0f172a", filter: "invert(1)" }}
                  className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
                >
                  <img src={social.icon} alt={social.name} className="w-5 opacity-50" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer for MD screens */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Links Column: Platform */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="group text-slate-500 hover:text-indigo-600 font-bold transition-all flex items-center gap-2"
                  >
                    <span className="h-[2px] w-0 bg-indigo-600 group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Company */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="group text-slate-500 hover:text-indigo-600 font-bold transition-all flex items-center gap-2"
                  >
                    <span className="h-[2px] w-0 bg-indigo-600 group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="w-full bg-slate-50/50 backdrop-blur-md py-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
            © 2026 Imagify AI. <span className="text-indigo-600">Built with Passion.</span>
          </p>
          <div className="flex items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-900 transition-colors">API Status</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Change Log</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
