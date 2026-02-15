import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setIsLoggedIn(false);
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/status`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await res.json();

      if (data.isLoggedIn && data.user) {
        setIsLoggedIn(true);
        setUser(data.user);
        setToken(storedToken);
      } else {
        // If status check fails but we have a token, it might be expired or invalid
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Failed to check auth status", err);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setIsLoggedIn(true);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
      });
      localStorage.removeItem("token");
      setToken(null);
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const signup = async (formData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data.error || "Signup failed";
      if (data.errors && Array.isArray(data.errors)) {
        const error = new Error(errorMessage);
        error.details = data.errors;
        throw error;
      }
      throw new Error(errorMessage);
    }

    return data;
  };

  const updateUserFavorites = (homeId, isAdding) => {
    if (!user) return;

    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      if (isAdding) {
        updatedUser.favourites = [...(prevUser.favourites || []), homeId];
      } else {
        updatedUser.favourites = (prevUser.favourites || []).filter(
          (fav) => (fav._id || fav || "").toString() !== homeId.toString(),
        );
      }
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        token,
        login,
        logout,
        signup,
        checkAuth,
        updateUserFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
