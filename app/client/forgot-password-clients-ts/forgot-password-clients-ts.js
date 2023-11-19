"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/dashboard/LayoutClient.module.css";

const ForgotPasswordClientsTS = () => {
  const router = useRouter();
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    // capturar token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    console.log(token)

    setToken(token);
    // verificar token clave
    //obtener email dentro del token
    //si es valido a pagina de recuperado de contraseña con el email
    //si no es valido a raiz "/"
  }, []);

  const setToken = async (token) => {
    try {
        console.log("en la funcion:::", token)
      const response = await axios.post(
        "http://localhost:3001/api/clients/veriftokenjwt",
        {
          token
        }
      );
      console.log(response.data);
      setRespuesta(response.data);
      return response.data.verify;
    } catch (error) {
      console.log("Error al encontrar token: ", error);
    }
  };

  if (respuesta != null) {
  }

  return (
    <main className="contenedor">
      <div className={styles.bodymsg}>
        <div className={styles.verificando}>
            <div><h4>Validando...</h4></div>
          
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordClientsTS;
