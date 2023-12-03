"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login/Login.module.css";
import { authenticateUser } from "./utils/auth";
import { setCookie } from "./utils/cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import LayoutRegister from "./client/Layout";
import { baseURL } from "@/baseUrl";

const MyApp = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const [noAuthhenticate, setNoAuthenticate] = useState("");



  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = await authenticateUser(email, password);
      if (userData) {
        let token = userData.data.token;
        login(token);
        setCookie("myToken", token, { expires: 1 });
        router.push("/client/dashboard/content-manager");
      } else {
        setNoAuthenticate("Las Credenciales No Coinciden.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <LayoutRegister>
      <main className="contenedor">
        <div className={styles.login}>
          <div className={styles.contenido}>
            <div className={styles.logo}>
              <Image
                layout="responsive"
                width={300}
                height={300}
                src="logo.svg"
                alt="Image logo"
              />
            </div>
            <div className={styles.formulario}>
              <form className={styles.form} onSubmit={submitHandler}>
                <div>
                  <h2>Inicia sesión o crea una cuenta</h2>
                </div>
                <div>
                  <h3>Correo electrónico</h3>
                </div>
                <div>
                  <input
                    type="email"
                    id="email_field"
                    className={styles.formcontrol}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                  />
                </div>
                <div>
                  <h3>Contraseña</h3>
                </div>
                <div>
                  <input
                    type="password"
                    id="password_field"
                    className={styles.formcontrol}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                </div>

                <div className={styles.recuperar}>
                  <Link
                    className={styles.linkrecuperar}
                    href="/client/search-email"
                  >
                    <p>¿Recuperar contraseña?</p>
                  </Link>
                </div>

                <div>
                  {noAuthhenticate && (
                    <div className={styles.warning}>{noAuthhenticate}</div>
                  )}
                </div>
                <div>
                  <button type="submit" className={styles.buttonsig}>
                  {cargando ? <p>Cargando...</p> : <p>Iniciar sesion</p>}
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
        </div>
      </main>
    </LayoutRegister>
  );
};

export default MyApp;
//http://localhost:3000/client/login
