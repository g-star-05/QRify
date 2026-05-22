import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================
   CREATE CONTEXT
========================= */

export const AuthContext = createContext();

/* =========================
   PROVIDER
========================= */

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD USER FROM STORAGE
  ========================= */

  useEffect(() => {

    const storedUser =
      localStorage.getItem("qrify-user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);

  /* =========================
     LOGIN
  ========================= */

  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "qrify-user",
      JSON.stringify(userData)
    );
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    setUser(null);

    localStorage.removeItem("qrify-user");
  };

  /* =========================
     SIGNUP
  ========================= */

  const signup = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "qrify-user",
      JSON.stringify(userData)
    );
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

/* =========================
   CUSTOM HOOK
========================= */

export const useAuth = () => {

  return useContext(AuthContext);
};