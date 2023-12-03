"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import styles from "../../../styles/dashboard/InfoSubscription.module.css";
import { baseURL } from "@/baseUrl";

const MySubscription = () => {
  const { user } = useAuth();
  const [date, setAddDate] = useState();
  const [suscrito, setSuscrito] = useState();
  const [tipoPlan, setTipoPlan] = useState();
  const [precio, setPrecio] = useState();

  useEffect(() => {
    const token = getCookie("myToken");
    const payload = jwt.decode(token);

    const fetchDataStripe = async () => {
      const response = await axios.get(
        `${baseURL}api/subscriptions/${payload.email}`
      );
      if (response.data.data) {
        const fecha = new Date(response.data.data.createdAt);
        const diaDelMes = fecha.getDate();
        setAddDate(diaDelMes);
        setSuscrito(true);
        const getsuscription = await axios.get(
          `${baseURL}api/clients/email/${response.data.data.email}`
        );
        if (getsuscription.data.data.plan === "estandar") {
          setTipoPlan("estándar");
          setPrecio("500");
        }
        if (getsuscription.data.data.plan === "basico") {
          setTipoPlan("básico");
          setPrecio("300");
        }
      } else {
        setSuscrito(false);
      }
    };

    fetchDataStripe();
  });
  return (
    <div className={styles.div}>
      <div className={styles.divprincipal}>
        <h2>Mi suscripción</h2>
        {suscrito === true ? (
          <div>
            <div>
              <p>
                Felicidades! Estas suscrito al plan <span>{tipoPlan}</span> de
                $<span>{precio}</span> pesos mexicanos mensuales.
              </p>{" "}
              <p>Se te estará cobrando el dia {date} de cada mes.</p>
            </div>
            <div className={styles.disculpas}>
              <p>
                {" "}
                Aviso Importante: Cambios en la cancelación de suscripción.
              </p>
              <p>
                Lamentablemente, en este momento, no contamos con la capacidad
                de permitir que los usuarios cancelen sus suscripciones
                directamente desde la aplicación. Esto es algo que reconocemos
                como una limitación y queremos pedirte disculpas por cualquier
                inconveniente que esto pueda causarte. Entendemos que la
                capacidad de gestionar tu suscripción de forma sencilla es
                crucial, y estamos trabajando diligentemente para implementar
                una solución que permita a los usuarios cancelar sus
                suscripciones de manera directa y eficiente desde la aplicación.
                Mientras tanto, si deseas cancelar tu suscripción, por favor,
                ponte en contacto con nuestro equipo de soporte en{" "}
                <span>turingospace.team@gmail.com</span> o bien llamar a{" "}
                <span>9196542389</span>.
              </p>
              <p>Gracias por ser parte de nuestra comunidad.</p>
            </div>
          </div>
        ) : (
          <div>No estas suscrito</div>
        )}
        {/* <p>Estas suscrito al plan básico de $300 pesos mexicanos menusales.</p> */}
      </div>
    </div>
  );
};

export default MySubscription;
