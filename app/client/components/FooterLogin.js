
import Link from 'next/link'
import styles from "../../styles/login/FooterLogin.module.css"
const FooterLogin = () => {
  return (
        <footer className={styles.footerlogin}>
            <div className={styles.links}>
                <Link href="">Informacion</Link>
                <Link href="">Politica de privacidads</Link>
                <Link href="">Desarrolladores</Link>
                <Link href="">Guia</Link>
                <Link href="">Beneficios</Link>
                <Link href="">Preguntas</Link>
                <Link href="">@turingospace</Link>    
            </div>
        </footer>
  )
}

export default FooterLogin