
import Link from 'next/link';
import React from 'react';
import styles from "../../styles/dashboard/FooterClient.module.css"

const FooterClient = () => {
  return (
    <footer className={styles.footer}>
        <div className={`contenedor ${styles.contenido}`}>
            <nav className={styles.navegacion}>
                <Link href="">Nosotros</Link>
                <Link href="">¿Dudas?</Link>
                <Link href="../privacy">Politica de Privacidad</Link>
            </nav>
            <p className={styles.copyright}>Todos los derechos reservados</p>
        </div>
    </footer>
  )
}

export default FooterClient