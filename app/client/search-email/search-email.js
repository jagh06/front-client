"use client";
import { useRouter } from "next/navigation";
import styles from "../../styles/register/registerclient.module.css";
import React, { useState, FormEvent, useRef } from "react";
import axios from "axios";
import { baseURL } from "@/baseUrl";

const SearchEmail = () => {
  const [errorAdd, setErrorAdd] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  const fetchData = async (query) => {
    const response = await fetch(`${baseURL}api/clients/email/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data from the API");
    }
  };

  const onSubmit = async (query) => {
    try {
      const result = await fetchData(query);
      localStorage.setItem("mailAdded", JSON.stringify(query));

      if (result.data != null) {
        const email = result.data.email;
        const response = await axios.post(`${baseURL}api/clients/recover`, {
          email,
        });
        router.push("./msg-set-verification-link");
        return response.data;
      } else {
        setErrorAdd("Esta cuenta no esta registrada en Turingo Space");
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
              <p>Ingresa tu correo electrónico</p>
              <div>
                <input
                  type="email"
                  id="email_fiel"
                  className={styles.formcontrol}
                  ref={emailRef}
                  value={email}
                  placeholder="Correo electrónico"
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
        </div>
        <div className={styles.messageerror}>
          {errorAdd ? (
            <p className={styles.mesaggeExistsSearchEmail}>{errorAdd}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default SearchEmail;
