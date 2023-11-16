"use client";
import { createContext, useContext, useEffect, useState } from "react";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getCookie, setCookie } from "../utils/cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [cambio, setCambio] = useState(false);

  const newUser = async () => {
    const cifrado = getCookie("t_cifrado");
    if (cifrado !== null) {
      const decipher = crypto.createDecipher(
        "aes-256-cbc",
        "mi-claver-secreta-cypher"
      );
      let tokenDescifrado = decipher.update(cifrado, "hex", "utf-8");
      tokenDescifrado += decipher.final("utf-8");

      if (tokenDescifrado) {
        setCambio(true);
        login(tokenDescifrado);
      }
    } else {
      console.log("La cookie aún no está disponible");
    }
  };

  useEffect(() => {
    const cifrado = getCookie("t_cifrado");
    if (cifrado != null) {
      newUser();
    } else {
      console.log("sin cookie");
    }
  }, [cambio]);

  const login = (token) => {
    setCookie("myToken", token);
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
    console.log(data);
    setUser(data);
  };

  const logout = () => {
    removeCookie("t_cifrado");
    setUser(null);
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
