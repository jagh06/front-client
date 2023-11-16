"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/dashboard/HeaderClient.module.css";
import { useRouter } from "next/navigation";
import { parse } from "cookie";
import crypto from "crypto";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

const HeaderClient = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [initialName, setInitialName] = useState("");
  
  const { user } = useAuth();
 
  useEffect(() =>{
    if(user){
      const initial = user.email[0]
      setInitialName(initial)
    }
  }, [user])


  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [cifrado, setCifrado] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const menuRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== imageRef.current) {
        setOpen(false);
      }
    });

    const getCookieValue = (name) => {
      const cookies = parse(document.cookie);
      return cookies[name] || null;
    };

    //Obtener el valor de la cookie
    const myCookieValue = getCookieValue("t_cifrado");
    setCifrado(myCookieValue);


    // if (myCookieValue !== null) {
    //   const decipher = crypto.createDecipher(
    //     "aes-256-cbc",
    //     "mi-claver-secreta-cypher"
    //   );
    //   let tokenDescifrado = decipher.update(myCookieValue, "hex", "utf-8");
    //   tokenDescifrado += decipher.final("utf-8");

    //   jwtVerify(tokenDescifrado, new TextEncoder().encode("keymasterjagh06"));
    //   setToken(tokenDescifrado);

    //   const decodificarToken = (tokenDescifrado) => {
    //     try {
    //       const payload = jwt.decode(tokenDescifrado);
    //       return payload._id;
    //     } catch (error) {
    //       console.error("Error al decodificar el token:", error);
    //       return null;
    //     }
    //   };

    //   // Obtén el payload del token
    //   const data = decodificarToken(tokenDescifrado);
    //   console.log(data);
    //   const fetchData = async () => {
    //     try {
    //       console.log("id de usuario:::", data);
    //       const responde = await axios.get(
    //         `http://localhost:3001/api/clients/id/${data}`
    //       );
    //       const datas = responde.data;
    //       setEmail(datas.data.email);
    //       setName(datas.data.name);
    //     } catch (error) {
    //       console.error("Error al obtener datos:", error);
    //     }
    //   };

    //   fetchData();
    // } else {
    //   // La cookie aún no está disponible, puedes manejarlo de acuerdo a tus necesidades
    //   console.log("La cookie aún no está disponible");
    // }
  }, []);

  return (
    <header className={styles.header}>
      <div className="contenedor">
        <div className={styles.headerclient}>
          <div className={styles.navbar}>
            <Link href="/">
              <Image
                width={120}
                height={60}
                src="../../next.svg"
                alt="Image logo"
              />
            </Link>
            <nav className={styles.navegacion}>
              <Link
                href={`/client/dashboard/content-manager?temporary=${cifrado}`}
                //href="/client/dashboard/content-manager?temporary=${cifrado}"
                className={
                  currentRoute ===`/client/dashboard/content-manager?temporary=${cifrado}`
                    ? styles.active
                    : styles.nonActive
                }
              >
                Pagina de Inicio
              </Link>
              <Link
                href={`/client/dashboard/add-lodging?temporary=${cifrado}`}
                //href="/client/dashboard/add-lodging"
                className={
                  currentRoute ===`/client/dashboard/add-lodging?temporary=${cifrado}`
                    ? styles.active
                    : styles.nonActive
                }
              >
                Agregar hotel
              </Link>
              <Link
                href={`/client/dashboard/my-lodging?temporary=${cifrado}`}
                //href="/client/dashboard/my-lodging"
                className={
                  currentRoute ===`/client/dashboard/my-lodging?temporary=${cifrado}`
                    ? styles.active
                    : styles.nonActive
                }
              >
                Mi hospedaje
              </Link>
            </nav>
          </div>
          <div className={styles.iconuser}>
            <div>
              <div className={styles.dropBody}>
                {/* <div>
                  <Image
                    className={styles.imageuser}
                    src="/images/nexticon.png"
                    width={100}
                    height={100}
                    alt="avatar"
                    onClick={() => setOpen(!open)}
                    ref={imageRef}
                  />
                </div> */}
                <div>
                  <div className={styles.divinitialnameuser}>
                    <h3 className={styles.h3initialnameuser}>{initialName}</h3>
                  </div>
                </div>

                <div>{/* dropdown */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
