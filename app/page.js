"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import styles from "./styles/login/Login.module.css"
import LoginInfo from './client/components/FooterLogin'

const MyApp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const data = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <main className="contenedor">
      <div className={styles.login}>
        <div className={styles.contenido}>
          <div className={styles.logo}>
            <Image
              layout="responsive"
              width={300}
              height={300}
              src="next.svg"
              alt="Image logo"
            />
          </div>
          <div className={styles.formulario}>
            <form className={styles.form}>
              <div>
                <h2>Inicia sesión o crea una cuenta</h2>
              </div>
              <div>
                <h3>Correo electronico</h3>
              </div>
              <div>
                <input
                  type="email"
                  id="email_field"
                  className={styles.formcontrol}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <h3>Contraseña</h3>
              </div>
              <div>
                <input
                  type="email"
                  id="password_field"
                  className={styles.formcontrol}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button  type="submit" className={styles.buttonsig}>
                  Iniciar Sesion
                </button>
              </div>
              <div>
                <p className={styles.question}>
                  No estas registrado?{" "}
                  <Link className={styles.register} href="/client/set-email">
                    Registrate
                  </Link>
                </p>
              </div>
              <div>
                <div className={styles.beforeafter}>O</div>
              </div>
            </form>
          </div>
        </div>
        <footer className={styles.footer}>
          <LoginInfo />
        </footer>
      </div>
    </main>
  );
};

export default MyApp;
 //http://localhost:3000/client/login