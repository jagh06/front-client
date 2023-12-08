
import Link from 'next/link'
import styles from "../../styles/login/FooterLogin.module.css"
const FooterLogin = () => {
  return (
        <footer className={styles.footerlogin}>
            <div className={styles.links}>
                <Link href="">Información</Link>
                <Link href="./client/privacy">Política de privacidad</Link>
                <Link href="">Desarrolladores</Link>
                <Link href="">Beneficios</Link>
                <Link href="">@turingospace</Link>    
            </div>
        </footer>
  )
}

export default FooterLogin