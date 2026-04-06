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
        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-6"
      >
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Simple, Transparent Pricing
        </p>
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
        Choose your plan
      </h1>
      <p className="text-slate-500 text-lg mb-16 max-w-lg mx-auto leading-relaxed">
        Unlock the full potential of AI generation with our flexible credit packs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto items-center">
        {plans.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`relative p-10 rounded-[2.5rem] transition-all duration-300 ${
              item.id === "Intermediate"
                ? "bg-slate-900 text-white shadow-2xl shadow-indigo-500/20 scale-105 z-10"
                : "bg-white border border-slate-200 text-slate-900 shadow-xl"
            }`}
          >
            {item.id === "Intermediate" && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg">
                Most Popular
              </div>
            )}
            <img src={assets.logo_icon} alt="" className="w-12 mb-6" />
            <h2 className="text-2xl font-black mb-2">{item.id}</h2>
            <p className="text-sm font-medium mb-6 opacity-60 line-clamp-1">{item.desc}</p>
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-5xl font-black">${item.price}</span>
              <span className="text-sm opacity-60">/ {item.credits} credits</span>
            </div>
            <button
              onClick={() => handlePurchase(item)}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95 ${
                item.id === "Intermediate"
                  ? "bg-white text-slate-900 hover:bg-slate-50"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {user ? "Get Started" : "Purchase Now"}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
