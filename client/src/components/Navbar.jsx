import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../public/images/assets";
import { useAuth } from "../context/AppContext";
import { useState } from "react";

const Navbar = () => {
  const { user, setShowLogin, logOut, credits } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 py-3 sm:px-10 md:px-14 lg:px-28">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={assets.logo} alt="logo" className="w-28 md:w-32 lg:w-36" />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <div className="flex items-center gap-3 sm:gap-6">
              <button
                onClick={() => navigate("/buy")}
                className="hidden sm:flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-full hover:bg-indigo-100 transition-colors group"
              >
                <img
                  src={assets.credit_star}
                  alt="credit star"
                  className="w-4 group-hover:rotate-12 transition-transform"
                />
                <p className="text-xs font-semibold text-indigo-600">
                  {credits} Credits
                </p>
              </button>

              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

              <div className="relative group">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                      Pro Member
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src={assets.profile_icon}
                      className="w-10 h-10 rounded-full border-2 border-indigo-500/20 p-0.5 group-hover:border-indigo-500 transition-colors"
                      alt="user"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden py-2">
                    <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                      <p className="text-xs font-bold text-slate-800">
                        {user.name}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/buy")}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Buy Credits
                    </button>
                    <button
                      onClick={logOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                to="/buy"
                className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block"
              >
                Features
              </Link>
              <button
                onClick={() => setShowLogin(true)}
                className="radiant-button bg-slate-900 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-indigo-500/10"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
