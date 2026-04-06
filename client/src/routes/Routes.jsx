import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Result from "../pages/Result";
import BuyCredit from "../pages/BuyCredit";
import Layouts from "../layouts/Layouts";
import Footer from "../components/Footer";
import Login from "../components/Login";
import { useAuth } from "../context/AppContext";
import PaymentSuccess from "../pages/PaymentSuccess";
import { motion } from "motion/react";

const Router = () => {
  const { showLogin } = useAuth();
  return (
    <div className="mesh-bg px-4 py-2.5 sm:px-10 md:px-14 lg:px-28 min-h-screen relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        <Layouts></Layouts>
        {showLogin && <Login></Login>}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/buy" element={<BuyCredit />}></Route>
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Router;
