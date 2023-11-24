"use client";
import React from "react";
import styles from "../../../styles/dashboard/Dashboard.module.css";
import { useRouter } from "next/navigation";
import LayoutClient from "../../components/LayoutClient";

const NoSubscribe = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/client/dashboard/customer-suscripcion");
  };
  return (
    <div className={styles.divprincipal}>
      <h2>
        Bienvenido <span>{name}</span>
      </h2>
      <div className={styles.card}>
        <p>
          Agrega tu hotel y disfruta de los beneficios que ofrece Turingo Space
        </p>
        <button className={styles.button} onClick={handleClick}>
          Agregar hotel
        </button>
      </div>
      <div className={styles.divbeneficios}>
        <p>Beneficios</p>
        <div className={styles.beneficios}>
          <div className={styles.cb}>
            <h3>Promocion de hospedajes</h3>
            <p>Promocionamos tu hospedaje</p>
          </div>
          <div className={styles.cb}>
            <h3>Seguridad</h3>
            <p>Los datos del hotel y del usuario se mantienen seguros</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSubscribe;
