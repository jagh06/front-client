"use client";

import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import { baseURL } from "@/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import styles from "../../../styles/dashboard/MyProfile.module.css";

const MyProfile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [idUser, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("");
  useEffect(() => {
    const tokenExists = getCookie("myToken");
    const payload = jwt.decode(tokenExists);
    if (payload._id) {
      setIdUser(payload._id);
      const fetchDatas = async () => {
        const response = await axios.get(
          `${baseURL}api/clients/id/${payload._id}`
        );

        setName(response.data.data.name);
        setLastName(response.data.data.lastname);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);

        if (response.data.data.plan === "estandar") {
          setPlan("Estándar");
        }
        if (response.data.data.plan === "basico") {
          setPlan("Básico");
        }
      };
      fetchDatas();
    }
  }, []);

  const handleFormSubmits = async (e) => {
    const tokenExists = getCookie("myToken");
    e.preventDefault();
    console.log("id user a acrtualizar:::", idUser);
    const response = await axios.put(
      `${baseURL}api/clients/${idUser}`,
      {
        name: name,
        lastname: lastName,
        phone: phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenExists}`,
        },
      }
    );
    if (response.status === 200) {
      router.push("");
    }
  };

  return (
    <div className={styles.div}>
      <div className={styles.divprincipal}>
        <div className={styles.info}>
          <p>
            Correo electronico: <span>{email}</span>
          </p>
          <p>
            Plan: <span>{plan}</span>
          </p>
        </div>
        <form onSubmit={handleFormSubmits}>
          <div className={styles.inputs}>
            <div>
              <input
                type="text"
                id="name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="name"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="apellidos"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="name"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                required
              />
            </div>
          </div>

          <div className={styles.button}>
            <button>Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
