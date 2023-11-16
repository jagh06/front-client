"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../../styles/register/registerclient.module.css";
import stylesh from "../../styles/register/HeaderClient.module.css";
import Link from "next/link";
import Image from "next/image";

import LoginInfo from "../components/FooterLogin";
import { useRouter } from "next/navigation";
import { baseURL } from "@/baseUrl";

const SetPassword = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [rpassword, setPasswordRepeat] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);

  const router = useRouter();

  //waosnt
  useEffect(() => {
    const datas = localStorage.getItem("setDatas");
    const datasAdded = JSON.parse(datas);
    setEmail(datasAdded.email);
    setName(datasAdded.name);
    setLastName(datasAdded.lastname);
    setPhone(datasAdded.phone);
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      setErrorOne(true);
      setErrorTwo(true);
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("La contraseña debe tener al menos un número.");
      setErrorOne(true);
      setErrorTwo(true);
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError(
        "La contraseña debe tener al menos una letra en Mayuscula."
      );
      setErrorOne(true);
      setErrorTwo(true);
    } else {
      setPasswordError("");
      setErrorOne(false);
    }
  };

  const handlePasswordRepeatChange = (e) => {
    const newPasswordR = e.target.value;
    setPasswordRepeat(newPasswordR);

    if (newPasswordR != password) {
      setPasswordRepeatError("Las contraseñas no coinciden");
      setErrorTwo(true);
    } else {
      setPasswordRepeatError("");
      setErrorTwo(false);
    }
  };

  const handleFormSubmits = async (e) => {
    e.preventDefault();
    onSubmit({ name, lastname, email, password });
  };

  const onSubmit = async (query) => {
    try {
      if (errorOne != true && errorTwo != true) {
        await submitDataToBackend({
          name: name,
          lastname: lastname,
          email: email,
          phone: phone,
          password: rpassword,
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitDataToBackend = async (data) => {
    const response = await fetch(`${baseURL}/clients`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.data.token;
      const email = data.data.user.email;
      //document.cookie = `token=${token}; path=/`;
      //router.push("new-account");
      localStorage.setItem("myEmail", JSON.stringify(email));
      router.push("./new-account");
    } else {
      console.log("error al agregar usuario");
    }
  };

  return (
    <main className="contenedor">
      <div className={styles.registerclient}>
        <div className={styles.backgroung}>
          <form className={styles.form} onSubmit={handleFormSubmits}>
            <h3>Crea una contraseña</h3>
            <p>
              La contraseña debe tener mínimo 8 carácteres que incluyan
              mayusculas, minusculas y numeros.
            </p>
            <div className={styles.field}>
              <p>Password</p>
              <div>
                <input
                  type="password"
                  id="password_fiel"
                  className="form_control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            {passwordError && (
              <div className={styles.warning}>{passwordError}</div>
            )}

            <div className={styles.field}>
              <p>Repite tu contraseña</p>
              <div>
                <input
                  type="password"
                  id="rpassword_fiel"
                  className="form_control"
                  value={rpassword}
                  onChange={handlePasswordRepeatChange}
                />
              </div>
            </div>
            {passwordRepeatError && (
              <div className={styles.warning}>{passwordRepeatError}</div>
            )}

            <div className={styles.divbutton}>
              <button type="submit" className={styles.button}>
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SetPassword;
