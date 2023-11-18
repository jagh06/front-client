"use client";
import { useRouter } from "next/navigation";
import styles from "../../styles/register/registerclient.module.css";
import React, { useState, FormEvent, useRef } from "react";

const SearchEmail = () => {
  const [errorAdd, setErrorAdd] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  const onSubmit = async (query) => {
    try {
      localStorage.setItem("mailAdded", JSON.stringify(query));
      console.log("mi email:", query)

      if (query) {
        router.push("./clave");
      } else {
        setErrorAdd("Ingresa una contraseña");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="contenedor">
      <div className={styles.registerclient}>
        <div className={styles.backgroung}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Encuentra tu cuenta</h3>
            <div className={styles.field}>
              <p>Ingresa tu correo electronico</p>
              <div>
                <input
                  type="email"
                  id="email_fiel"
                  className="form_control"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.divbutton}>
              <button type="submit" className={styles.button}>
                Siguiente
              </button>
            </div>
          </form>
          {errorAdd ? (
            <p className={styles.mesaggeExists}>{errorAdd}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default SearchEmail;
