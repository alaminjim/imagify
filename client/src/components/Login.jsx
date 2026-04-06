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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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
          <h1 className="text-3xl font-black text-slate-900 mb-2">{state}</h1>
          <p className="text-slate-500 text-sm font-medium">
            {state === "Login"
              ? "Welcome back! Please enter your details."
              : "Start your creative journey today."}
          </p>
        </div>

        <div className="space-y-4">
          {state !== "Login" && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                <img src={assets.user_icon} alt="" className="w-5 opacity-40 group-focus-within:opacity-100" />
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
              <img src={assets.email_icon} alt="" className="w-5 opacity-40 group-focus-within:opacity-100" />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-medium"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
              <img src={assets.lock_icon} alt="" className="w-5 opacity-40 group-focus-within:opacity-100" />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-medium"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <p className="text-xs text-indigo-600 font-bold mt-4 cursor-pointer hover:text-indigo-700 transition-colors text-right">
          Forgot password?
        </p>

        <button className="w-full bg-slate-900 text-white rounded-2xl py-4 mt-8 font-bold text-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
          {state === "Login" ? "Login" : "Create account"}
        </button>

        <div className="mt-8 text-center text-sm font-medium">
          {state === "Login" ? (
            <p className="text-slate-500">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-indigo-600 font-bold cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="text-slate-500">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-indigo-600 font-bold cursor-pointer hover:underline"
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
