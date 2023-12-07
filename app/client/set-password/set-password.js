"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../../styles/register/registerclient.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { baseURL } from "@/baseUrl";
import { setCookie } from "@/app/utils/cookie";
import { BiShow } from "react-icons/bi";

const SetPassword = () => {
  const [accepted, setAccepted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [rpassword, setPasswordRepeat] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [errorAcepted, setErrorAcepted] = useState("");

  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);

  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

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
    } else if (!/[a-z]/.test(newPassword)) {
      setPasswordError(
        "La contraseña debe tener al menos una letra en minuscula."
      );
      setErrorOne(true);
      setErrorTwo(true);
    } else if (!/[!@#$%^&*()_\-+=]/.test(newPassword)) {
      setPasswordError(
        "La contraseña debe tener al menos una caracter especial. (ej. !#%&*)"
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

  const handleAcceptance = () => {
    setAccepted(true);
  };

  const handleFormSubmits = async (e) => {
    e.preventDefault();
    onSubmit({ name, lastname, email, password });
  };

  const onSubmit = async (query) => {
    try {
      setCargando(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (errorOne != true && errorTwo != true) {
        if (accepted == true) {
          await submitDataToBackend({
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            password: rpassword,
          });
        } else {
          setErrorAcepted(
            "Para continuar tienes que aceptar los términos y condiciones."
          );
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const submitDataToBackend = async (data) => {
    const response = await fetch(`${baseURL}api/clients`, {
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
      setCookie("myToken", token);
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
          <h2 className={styles.h2form}>Crea una contraseña</h2>
            <p className={styles.pmensaje}>
              La contraseña debe tener mínimo 8 caracteres que incluyan
              mayúsculas, minúsculas, números y algún caracter especial (ej. %#$).
            </p>
            <div className={styles.field}>
              <h3  className={styles.h3}>Contraseña</h3>
              <div className={styles.passowrddiv}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password_fiel"
                  className={styles.formcontrol}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa una contraseña"
                  required
                />
                <label className={styles.labelicon}>
                  <BiShow size={30} onClick={handleTogglePassword} />
                </label>
              </div>
            </div>
            {passwordError && (
              <div className={styles.warning}>{passwordError}</div>
            )}

            <div className={styles.field}>
              <h3  className={styles.h3}>Repite tu contraseña</h3>
              <div className={styles.passowrddiv}>
                <input
                  type={showPasswordRepeat ? "text" : "password"}
                  id="rpassword_fiel"
                  className={styles.formcontrol}
                  value={rpassword}
                  onChange={handlePasswordRepeatChange}
                  placeholder="Repite tu contraseña"
                  required
                />
                <label className={styles.labelicon}>
                  <BiShow size={30} onClick={handleTogglePasswordRepeat} />
                </label>
              </div>
            </div>
            {passwordRepeatError && (
              <div className={styles.warning}>{passwordRepeatError}</div>
            )}
            <div className={styles.aceptarcondiciones}>
              <label>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={handleAcceptance}
                />
                Acepto los{" "}
                <Link href="../client/privacy">términos y condiciones</Link>.
              </label>
              {errorAcepted && (
                <div className={styles.warning}>{errorAcepted}</div>
              )}
            </div>

            <div className={styles.divbutton}>
              <button type="submit" className={styles.button}>
                {cargando ? <p>Cargando...</p> : <p>Crear Cuenta</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SetPassword;
