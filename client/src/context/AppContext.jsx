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

  // Pre-warm the server to avoid cold start delays
  const preWarmServer = async () => {
    try {
      // Quietly ping the health endpoint
      await axios.get(`${backendUrl}/health`);
      console.log("Server warmed up");
    } catch (error) {
      console.error("Warmup failed", error);
    }
  };

  const loadCreditsData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logOut();
      }
      toast.error(error.response?.data?.message || "Failed to load credits");
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
        await loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        await loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Generation failed. Please try again.");
      if (error.response?.status === 401) {
        logOut();
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setGeneratedImage(null);
    setShowLogin(true);
    toast.success("Logout successful!");
  };

  // Effect for initial load and server warmup
  useEffect(() => {
    preWarmServer();
  }, []);

  // Effect for token changes - optimized to avoid redundant calls
  useEffect(() => {
    if (token && !user) {
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
    preWarmServer
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAuth = () => useContext(AppContext);
