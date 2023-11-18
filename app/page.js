"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login/Login.module.css";
import LoginInfo from "./client/components/FooterLogin";
import { authenticateUser } from "./utils/auth";
import { setCookie } from "./utils/cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import LayoutRegister from "./client/Layout";

const MyApp = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [noAuthhenticate, setNoAuthenticate] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = await authenticateUser(email, password);
      if (userData) {
        let token = userData.data.token;
        login(token);
        setCookie("myToken", token);
        router.push("/client/dashboard/content-manager");
      } else {
        setNoAuthenticate("Las Credenciales No Coinciden.");
      }
    } catch (error) {
      console.log(error);
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
                src="next.svg"
                alt="Image logo"
              />
            </div>
            <div className={styles.formulario}>
              <form className={styles.form} onSubmit={submitHandler}>
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
                    required
                  />
                </div>

                <div className={styles.recuperar}>
                  <Link className={styles.linkrecuperar} href="/client/search-email">
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
        </div>
      </main>
    </LayoutRegister>
  );
};

export default MyApp;
//http://localhost:3000/client/login
