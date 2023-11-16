import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import LoginInfo from "./components/FooterLogin";
import styles from "../styles/register/HeaderClient.module.css";

const LayoutRegister= ({ children }) => {
  return (
    <div>
      <Head>
        <title>Panel</title>
        <meta name="description" content="Panel de control" />
      </Head>
      <div className={styles.layoutclient}>
        <header className={styles.header}>
          <div>
            <div>
              <Link href="/">
                <Image
                  width={120}
                  height={60}
                  src="../../next.svg"
                  alt="Image logo"
                />
              </Link>
            </div>
          </div>
        </header>
        <div>{children}</div>
        <footer>
          <LoginInfo />
        </footer>
      </div>
    </div>
  );
};

export default LayoutRegister;
