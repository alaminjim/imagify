import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { token, loadCreditsData, backendUrl } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const session_id = query.get("session_id");

    if (!session_id) {
      toast.error("Invalid payment session");
      navigate("/buy");
      return;
    }

    // verify payment
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-payment`,
          { session_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          toast.success(`Payment successful! Added credits.`);
          loadCreditsData();
          navigate("/buy");
        }
      } catch (err) {
        console.error(err);
        toast.error("Payment verification failed");
        navigate("/buy");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-6">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-2xl"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-2xl"
        ></motion.div>
      </div>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-2xl font-black text-slate-900 tracking-tight"
      >
        Securing Your Payment...
      </motion.p>
      <p className="mt-4 text-slate-500 font-medium">
        Please do not refresh this page.
      </p>
    </div>
  );
};

export default PaymentSuccess;
