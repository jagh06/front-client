"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/dashboard/LayoutClient.module.css";
import { setCookie } from "@/app/utils/cookie";
import { jwtVerify } from "jose";
import { baseURL } from "@/baseUrl";

const ForgotPasswordClientsTS = () => {
  const router = useRouter();
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    // capturar token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    setToken(token);
  }, []);

  const setToken = async (token) => {
    try {
      const response = await axios.post(
        `${baseURL}api/clients/veriftokenjwt`,
        {
          token,
        }
      );
      VerifyToken(response.data.responseTokenIsvalid);
    } catch (error) {
      console.log("Error al encontrar token: ", error);
    }
  };

  const VerifyToken = async (data) => {
    if (data.valid != null) {
      setCookie("secure_token_restaurate_the_password", data.token, { expires: 1 });
      router.push("/client/new-password");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="contenedor">
      <div className={styles.bodymsg}>
        <div className={styles.verificando}>
          <div>
            <h4>Validando...</h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordClientsTS;
