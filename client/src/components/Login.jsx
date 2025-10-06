import { useEffect, useState } from "react";
import { assets } from "../../public/images/assets";
import { useAuth } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("login");
  const { setShowLogin, backendUrl, setToken, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
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
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute fixed top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h2 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h2>
        <p className="text-sm text-center pt-1.5">
          Welcome Back! Please sign in to continue
        </p>

        {state !== "login" && (
          <div className="border border-[#D3D3D3] w-[295px] h-[42px] px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" className="bg-white" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="border border-[#D3D3D3] w-[295px] h-[42px] px-4 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className="bg-white" />
          <input
            type="text"
            placeholder="Email"
            required
            className="outline-none text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border border-[#D3D3D3] w-[295px] h-[42px] px-4 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="bg-white" />
          <input
            type="password"
            placeholder="password"
            required
            className="outline-none text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-sm text-blue-600 my-2 cursor-pointer">
          Forgot Password?
        </p>
        <button className="bg-blue-500 w-full text-white py-2 mt-1.5 rounded-full">
          {state === "login" ? "Login" : "Create account"}
        </button>
        {state === "login" ? (
          <p className="mt-5 text-center">
            Don't have an account{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
