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
    <div className="min-h-[70vh] flex justify-center items-center text-xl">
      Processing Payment...
    </div>
  );
};

export default PaymentSuccess;
