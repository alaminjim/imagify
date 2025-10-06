/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credits, setCredits] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message || "Failed to load credits");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        loadCreditsData();
        setGeneratedImage(data.resultImage);
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();

        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setGeneratedImage(null);
    toast.success("Logout successful!");
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credits,
    setCredits,
    backendUrl,
    loadCreditsData,
    logOut,
    generateImage,
    generatedImage,
    setGeneratedImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAuth = () => useContext(AppContext);
