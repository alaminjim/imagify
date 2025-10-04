import { Link } from "react-router-dom";
import { assets } from "../../public/images/assets";

const Footer = () => {
  return (
    <footer className="w-full bg-white/20 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center text-center">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="h-11 mb-2 drop-shadow-sm"
          />
        </Link>
        <p className="max-w-xl text-sm text-gray-600 leading-relaxed">
          The easiest way to create high-quality AI-generated visuals for your
          brand, projects, and creativity.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 py-3">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.instagram_icon} alt="" />
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-gray-500">
          <span>© 2025 </span>
          All right reserved. Copyright @imagify
        </div>
      </div>
    </footer>
  );
};

export default Footer;
