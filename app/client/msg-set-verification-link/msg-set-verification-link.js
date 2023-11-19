"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/LayoutClient.module.css";

const ClaveProporcionada = () => {
  const router = useRouter();
  const [emailAdded, setEmailAdded] = useState("");

  useEffect(() => {
    const emailAdd = localStorage.getItem("mailAdded");
    const data = JSON.parse(emailAdd);
    setEmailAdded(data);
  });

  let textoOriginal = emailAdded;
  let chars = 4;

  let res = textoOriginal.replace(
    /[a-z0-9\-_.]+@/gi,
    (c) =>
      c.substr(0, chars) +
      c
        .split("")
        .slice(chars, -1)
        .map((v) => "*")
        .join("") +
      "@"
  );

  return (
    <main className="contenedor">
      <div className={styles.bodymsg}>
        <h3>
          Hemos enviado un enlace de recuperacion de contraseña a{" "}
          <span className={styles.emailvalidate}>
            {res}
          </span>
        </h3>

        <div className={styles.bodymsgverificationemail}>
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default ClaveProporcionada;
