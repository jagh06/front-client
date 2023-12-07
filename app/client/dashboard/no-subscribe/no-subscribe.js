"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/dashboard/Dashboard.module.css";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/utils/cookie";
import jwt from "jsonwebtoken";

const NoSubscribe = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = getCookie("myToken");
    const payload = jwt.decode(token);
    setName(payload.name);
  });
  const handleClick = () => {
    router.push("/client/dashboard/customer-suscripcion");
  };
  return (
    <div className={styles.divprincipal}>
      <div className={styles.dashboard}>
        <div className={styles.listBeneficios}>
          <h2>
            Bienvenido <span>{name}</span>
          </h2>
          <div className={styles.card}>
            <p>
              Agrega tu hotel y disfruta de los beneficios que ofrece Turingo
              Space.
            </p>
            <button className={styles.button} onClick={handleClick}>
              Agregar hotel
            </button>
          </div>
          <p className={styles.pbeneficios}>Beneficios</p>
          <div className={styles.beneficios}>
            <div className={styles.cb}>
              <h3>Promoción de hospedajes</h3>
              <p>Promocionamos tu hospedaje.</p>
            </div>
            <div className={styles.cb}>
              <h3>Seguridad</h3>
              <p>Los datos del hotel y del usuario se mantienen seguros.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSubscribe;
