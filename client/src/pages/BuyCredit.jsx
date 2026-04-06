import { assets, plans } from "../../public/images/assets";
import { useAuth } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const BuyCredit = () => {
  const { user, token, loadCreditsData, backendUrl } = useAuth();

  const handlePurchase = async (plan) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/create-checkout-session`,
        { planId: plan.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.href = data.url; // Stripe checkout redirect
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to start payment");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-24 pb-12 px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8 shadow-sm shadow-indigo-500/5"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">
          Simple, Transparent Pricing
        </p>
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
        Scale your <span className="text-gradient">creativity</span>
      </h1>
      <p className="text-slate-500 text-lg mb-20 max-w-lg mx-auto leading-relaxed font-medium">
        Unlock high-resolution AI generation with our flexible credit packs. No hidden fees.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto items-center">
        {plans.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -15, scale: item.id === "Intermediate" ? 1.08 : 1.03 }}
            className={`relative p-12 rounded-[3rem] transition-all duration-500 ${
              item.id === "Intermediate"
                ? "bg-slate-900 text-white shadow-[0_40px_80px_-15px_rgba(79,70,229,0.3)] z-10 border-4 border-indigo-500"
                : "bg-white border-2 border-slate-100 text-slate-900 shadow-2xl"
            }`}
          >
            {item.id === "Intermediate" && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl ring-4 ring-white">
                Best Value
              </div>
            )}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 border ${
              item.id === "Intermediate" ? "bg-white/10 border-white/20" : "bg-indigo-50 border-indigo-100"
            }`}>
              <img src={assets.logo_icon} alt="" className="w-8" />
            </div>
            
            <h2 className="text-2xl font-black mb-3 tracking-tight uppercase">{item.id}</h2>
            <p className={`text-sm mb-10 font-medium ${item.id === "Intermediate" ? "text-white/60" : "text-slate-400"}`}>
              {item.desc}
            </p>

            <div className="flex items-baseline justify-center gap-1 mb-12">
              <span className={`text-6xl font-black tracking-tighter ${item.id === "Intermediate" ? "text-white" : "text-gradient"}`}>
                ${item.price}
              </span>
              <span className={`text-sm font-bold uppercase ${item.id === "Intermediate" ? "text-white/40" : "text-slate-300"}`}>
                / {item.credits} credits
              </span>
            </div>

            <button
              onClick={() => handlePurchase(item)}
              className={`radiant-button w-full py-5 rounded-[2rem] font-black text-xl transition-all shadow-xl ${
                item.id === "Intermediate"
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              Get Started Now
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
