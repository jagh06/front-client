"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/dashboard/Dashboard.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import LayoutClient from "../../components/LayoutClient";
import { useAuth } from "@/app/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(user){
      setName(user.name);
    }
  }, [user])

  //
  const handleClick = () => {
    router.push("/client/dashboard/add-lodging");
  };

  return (
    <LayoutClient>
      <main className="contenedor">
        <div>
          <h2>Bienvenido <span>{name}</span></h2>
          <div className={styles.card}>
            <p>Agrega tu hotel y disfruta de los beneficios que ofrece Turingo Space</p>
            <button className={styles.button} onClick={handleClick}>
              Agregar hotel
            </button>
          </div>
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
      </main>
    </LayoutClient>
  );
};



export default Dashboard;

//  http://localhost:3000/client/dashboard/content-manager
