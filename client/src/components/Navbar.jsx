import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../public/images/assets";
import { useAuth } from "../context/AppContext";
import { useState } from "react";

const Navbar = () => {
  const { user, setShowLogin, logOut, credits } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 md:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3 relative">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img src={assets.credit_star} alt="credit star" className="w-5" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left : {credits}
              </p>
            </button>

            <p className="text-gray-600 max-sm:hidden pl-4">Hi! {user.name}</p>

            {/* User profile dropdown */}
            <div className="relative">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow cursor-pointer"
                alt="user"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute top-12 right-0 z-10 bg-white rounded-md border border-gray-200 shadow-lg">
                  <ul className="list-none m-0 p-2 text-sm">
                    <li
                      onClick={() => {
                        logOut();
                        setMenuOpen(false);
                      }}
                      className="py-1 px-4 cursor-pointer hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <p
              onClick={() => navigate("/buy")}
              className="text-[#545454] cursor-pointer"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white lg:w-[146px] h-[42px] w-[90px] rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
