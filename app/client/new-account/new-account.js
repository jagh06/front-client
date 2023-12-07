"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/dashboard/HeaderClient.module.css";
import stylesh from "../../styles/register/registerclient.module.css";
import { useRouter } from "next/navigation";

const NewAccount = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getEmail = localStorage.getItem("myEmail");
    localStorage.removeItem("setDatas");
    const mail = JSON.parse(getEmail);
    setEmail(mail);

    if (!mail) {
      router.push("/");
    }

    //clean localstorage
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <div>
          <div className={styles.image}>
            <Link href="/">
              <Image
                width={110}
                height={20}
                src="/fondo.png"
                alt="Image logo"
              />
            </Link>
          </div>
        </div>
      </header>
      <main className={stylesh.contenedor}>
        <div>
          <h3>Verifica tu correo.</h3>
        </div>
        <div className={styles.spanemail}>
          <p>
            Hemos enviado un enlace de confirmación al correo <span>{email}</span>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewAccount;
