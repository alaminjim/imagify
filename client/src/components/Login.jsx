import { useEffect, useState } from "react";
import { assets } from "../../public/images/assets";
import { useAuth } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Login Successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Registration Successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 transition-all duration-500">
      <motion.form
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-200 overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl"></div>

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <img src={assets.cross_icon} alt="" className="w-4" />
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            {state === "Login" ? "Welcome " : "Join "}
            <span className="text-gradient">Back</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            {state === "Login"
              ? "The future of AI is waiting"
              : "Start your creative journey"}
          </p>
        </div>

        <div className="space-y-5">
          {state !== "Login" && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                <img src={assets.user_icon} alt="" className="w-5 opacity-30 group-focus-within:opacity-100" />
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full bg-slate-50/50 border-2 border-slate-100 text-slate-900 pl-14 pr-5 py-4 rounded-3xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold"
                placeholder="How should we call you?"
                required
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
              <img src={assets.email_icon} alt="" className="w-5 opacity-30 group-focus-within:opacity-100" />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full bg-slate-50/50 border-2 border-slate-100 text-slate-900 pl-14 pr-5 py-4 rounded-3xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
              <img src={assets.lock_icon} alt="" className="w-5 opacity-30 group-focus-within:opacity-100" />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full bg-slate-50/50 border-2 border-slate-100 text-slate-900 pl-14 pr-5 py-4 rounded-3xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold"
              placeholder="Your Secret Password"
              required
            />
          </div>
        </div>

        <p className="text-xs text-indigo-600 font-black mt-5 cursor-pointer hover:text-indigo-700 transition-colors text-right uppercase tracking-widest">
          Forgot password?
        </p>

        <button 
          type="submit"
          disabled={loading}
          className="radiant-button w-full bg-slate-900 text-white rounded-2xl py-2.5 mt-8 font-bold text-base shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              <span className="opacity-80">Please wait...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {state === "Login" ? "Login Now" : "Create My Account"}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
            </span>
          )}
        </button>

        <div className="mt-10 text-center text-sm font-bold">
          {state === "Login" ? (
            <p className="text-slate-400 uppercase tracking-widest text-[10px]">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-indigo-600 font-black cursor-pointer hover:underline ml-1"
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="text-slate-400 uppercase tracking-widest text-[10px]">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-indigo-600 font-black cursor-pointer hover:underline ml-1"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
