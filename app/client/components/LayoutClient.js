import Head from "next/head";
import React from "react";
import HeaderClient from "./HeaderClient";
import FooterClient from "./FooterClient";
import styles from "../../styles/dashboard/LayoutClient.module.css";

const LayoutClient = ({ children, pagina }) => {
  return (
    <div>
      <Head>
        <title>Panel - {pagina}</title>
        <meta name="description" content="Panel de control" />
      </Head>

      <div className={styles.layout}>
        <HeaderClient />
        <div className={styles.divchildren}>{children}</div>
        <footer className={styles.footer}>
          <FooterClient />
        </footer>
      </div>
    </div>
  );
};

export default LayoutClient;
