"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import crypto from "crypto";
import { jwtVerify } from "jose";
import { setCookie } from "@/app/utils/cookie";

const Verify = () => {
  const router = useRouter();

  useEffect(() => {
    // Obtiene el token de los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("temporary");
    //cookies.set("t_cifrado", token);

    
      const decipher = crypto.createDecipher(
        "aes-256-cbc",
        "mi-claver-secreta-cypher"
      );

      let tokenDescifrado = decipher.update(token, "hex", "utf-8");
      tokenDescifrado += decipher.final("utf-8");
      if (tokenDescifrado) {
        setCookie("myToken", tokenDescifrado);
        router.push(`/client/dashboard/content-manager`);
      }
    

    // Verificar y decodificar el token
    // jwtVerify(tokenDescifrado, new TextEncoder().encode("keymasterjagh06"));
    // // Realiza acciones adicionales según tus necesidades
    // if (tokenDescifrado) {
    //   cookies.set("token_user", tokenDescifrado);
    //   router.push(`/client/dashboard/content-manager?temporary=${token}`)
    // }
  }, []);
  return <div>Vericando...</div>;
};

export default Verify;
