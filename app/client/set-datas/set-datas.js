"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/register/registerclient.module.css";
import { useRouter } from "next/navigation";

const SetDatas = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const datas = localStorage.getItem("emailAdded");
    const emailAdded = JSON.parse(datas);
    setEmail(emailAdded);
  }, []);

  const handleFormSubmits = async (e) => {
    e.preventDefault();
    onSubmit({ name, lastname, email, phone });
  };

  const onSubmit = async (query) => {
    try {
      setCargando(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const addedDatas = {
        name: name,
        lastname: lastname,
        email: email,
        phone: `+52 ${phone}`,
      };

      localStorage.setItem("setDatas", JSON.stringify(addedDatas));

      if (addedDatas) {
        if (phone.length < 10 || phone.length > 10) {
          setPhoneError("El numero de telefono debe tener 10 digitos");
        } else {
          router.push("/client/set-password");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main>
      <div className={styles.registerclient}>
        <div className={styles.backgroung}>
          <form className={styles.form} onSubmit={handleFormSubmits}>
            <h2 className={styles.h2form}>Agrega tus datos</h2>
            <p className={styles.emailadded}>Correo electrónico: {email}</p>
            <div className={styles.field}>
              <h3 className={styles.h3}>Nombre</h3>
              <input
                type="name"
                id="name_fiel"
                className={styles.formcontrol}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className={styles.field}>
              <h3 className={styles.h3}>Apellidos</h3>
              <input
                type="name"
                id="lastname_fiel"
                className={styles.formcontrol}
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ingresa tus apellidos"
                required
              />
            </div>

            <div className={styles.field}>
              <h3 className={styles.h3}>Número de Teléfono</h3>
              <span>+52</span>
              <input
                type="text"
                id="phone_fiel"
                className={styles.formcontrolphone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ingresa un número de teléfono"
                required
              />
            </div>
            {phoneError && <div className={styles.warning}>{phoneError}</div>}

            <div className={styles.divbutton}>
              <button type="submit" className={styles.button}>
                {cargando ? <p>Cargando...</p> : <p>Siguiente</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SetDatas;
