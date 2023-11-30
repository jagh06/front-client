"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import styles from "../../../styles/dashboard/ListaReservas.module.css";

const ReservationList = () => {
  const { user } = useAuth();

  const [datas, setDatas] = useState("");

  useEffect(() => {
    const token = getCookie("myToken");
    const payload = jwt.decode(token);

    fetchDatas(payload.email);
  }, []);

  const fetchDatas = async (data) => {
    const response = await axios.get(
      `http://localhost:3001/api/reservaciones/emailclient/${data}`
    );
    setDatas(response.data.data);
  };

  return (
    <div>
      <div className={styles.divpricipal}>
        <div className={styles.divlista}>
          {datas ? (
            <div className={styles.infouser}>
              <h3>Lista de reservados</h3>
              {datas.map((index) => (
                <div key={index._id} className={styles.cardinfouser}>
                  <div>
                  <h3>Información de contacto</h3>
                    <p>Nombre: {index.name}</p>
                    <p>Correo electronico: {index.email}</p>
                    <p>Numero de teléfono: {index.phone} </p>
                  </div>
                  <div>
                    <h3>Numero de personas</h3>
                    <p>Reservado para {index.numpersonas} personas.</p>
                  </div>
                  <div>
                    <h3>Numero de noches</h3>
                    <p>Reservado por {index.numdenoches} noches.</p>
                  </div>
                  <div>
                    <h3>Fecha de llegada</h3>
                    <p>Fecha de llegada: {index.fechallegada}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No Hay nada que mostrar</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
