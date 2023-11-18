"use client";
import { createContext, useContext, useEffect, useState } from "react";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const tokenExists = getCookie("myToken");
    if (tokenExists != null) {
      login(tokenExists);
    } else {
      console.log("No hay Token")
    }
  }, []);

  const login = (token) => {
    const decodificarToken = (token) => {
      try {
        const payload = jwt.decode(token);
        return payload;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    };

    const data = decodificarToken(token);
    setUser(data);
  };

  const logout = () => {
    removeCookie("myToken");
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
