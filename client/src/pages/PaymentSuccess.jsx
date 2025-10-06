import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { token, loadCreditsData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userId = query.get("userId");
    const planId = query.get("planId");
    const credits = parseInt(query.get("credits"));

    if (userId && planId && credits) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/add-credits`,
          { userId, planId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          toast.success(`Payment successful! Added ${credits} credits.`);
          loadCreditsData();
          navigate("/buy");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to add credits");
          navigate("/buy");
        });
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex justify-center items-center text-xl">
      Processing Payment...
    </div>
  );
};

export default PaymentSuccess;
