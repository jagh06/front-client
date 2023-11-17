"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/dashboard/HeaderClient.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import styleDrop from "../../styles/dropdown/Dropdown.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdCardTravel } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";

const HeaderClient = () => {
  const menuRef = useRef();
  const imgRef = useRef();

  const router = useRouter();
  const currentRoute = router.pathname;
  const [initialName, setInitialName] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      setName(user.name)
      setInitialName(user.email[0]);
    }
  }, [user]);


  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== imgRef.current) {
        setOpen(false);
      }
    });
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
                href={`/client/dashboard/content-manager`}
                className={
                  currentRoute === `/client/dashboard/content-manager`
                    ? styles.active
                    : styles.nonActive
                }
              >
                Pagina de Inicio
              </Link>
              <Link
                href={`/client/dashboard/add-lodging`}
                className={
                  currentRoute === `/client/dashboard/add-lodging`
                    ? styles.active
                    : styles.nonActive
                }
              >
                Agregar hotel
              </Link>
              <Link
                href={`/client/dashboard/my-lodging`}
                className={
                  currentRoute === `/client/dashboard/my-lodging`
                    ? styles.active
                    : styles.nonActive
                }
              >
                Mi hospedaje
              </Link>
            </nav>
          </div>

          <div className={styles.iconuser}>
            {/* iconouse */}
            <div>
              <div className={styleDrop.dropbody}>
                <div>
                  <button
                    className={styleDrop.imageuser}
                    onClick={() => setOpen(!open)}
                    ref={imgRef}
                  >
                    {initialName}
                  </button>
                </div>
                <div>
                  {open && (
                    <div ref={menuRef} className={styleDrop.droplist}>
                      <ul className={styleDrop.dropul}>
                        <span>
                          <div className={styleDrop.divuser}>
                            <div className={styleDrop.divimageuserdrop}>
                              <h3>{initialName}</h3>
                            </div>

                            <div className={styleDrop.divnameemail}>
                              <p className={styleDrop.username}>{name}</p>
                              <p className={styleDrop.useremail}>
                                {email}
                              </p>
                            </div>
                          </div>
                        </span>
                        <li>
                          <Link className={styleDrop.link} href="">
                            <AiOutlineUser size={20} />
                            <p>Gestionar cuenta</p>
                          </Link>
                        </li>
                        <li>
                          <Link className={styleDrop.link} href="">
                            <MdCardTravel size={20} />
                            <p>Mi hospedaje</p>
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            logout()
                          }}
                        >
                          <span className={styleDrop.link}>
                            <BiLogOutCircle size={20} />
                            <p>Cerrar Sesion</p>
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
