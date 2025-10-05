import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Result from "../pages/Result";
import BuyCredit from "../pages/BuyCredit";
import Layouts from "../layouts/Layouts";
import Footer from "../components/Footer";
import Login from "../components/Login";
import { useAuth } from "../context/AppContext";

const Router = () => {
  const { showLogin } = useAuth();
  return (
    <div className="px-4 py-2.5 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Layouts></Layouts>
      {showLogin && <Login></Login>}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/buy" element={<BuyCredit />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default Router;
