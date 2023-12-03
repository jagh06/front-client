"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/dashboard/HeaderClient.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import styleDrop from "../../styles/dropdown/Dropdown.module.css";
import { MdCardTravel } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { FaCcStripe } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const HeaderClient = () => {
  const menuRef = useRef();
  const imgRef = useRef();

  const pathname = usePathname();
  const [initialName, setInitialName] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
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
              <Image width={120} height={60} src="/logo.svg" alt="Image logo" />
            </Link>
            <nav className={styles.navegacion}>
              <Link
                href={"/client/dashboard/content-manager"}
                className={
                  pathname === "/client/dashboard/content-manager"
                    ? styles.active
                    : styles.nonActive
                }
              >
                Home
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
                              <p className={styleDrop.useremail}>{email}</p>
                            </div>
                          </div>
                        </span>

                        <li>
                          <Link
                            className={styleDrop.link}
                            href="../dashboard/my-profile"
                          >
                           <CgProfile size={20}/>
                            <p>Mi perfil</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={styleDrop.link}
                            href="../dashboard/reservation-list"
                          >
                            <MdCardTravel size={20} />
                            <p>Lista de reservados</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={styleDrop.link}
                            href="../dashboard/my-subscription"
                          >
                            <FaCcStripe size={20} />
                            <p>Mi plan</p>
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            logout();
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
