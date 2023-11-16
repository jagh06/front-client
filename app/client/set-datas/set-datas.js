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
    }
  };

  return (
    <main>
      <div className={styles.registerclient}>
        <div className={styles.backgroung}>
          <form className={styles.form} onSubmit={handleFormSubmits}>
            <h3>Agrega tus datos</h3>
            <p>Email: {email}</p>
            <div className={styles.field}>
              <p>Nombre</p>
              <div>
                <input
                  type="name"
                  id="name_fiel"
                  className={styles.formcontrol}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <p>Apellidos</p>
              <div>
                <input
                  type="name"
                  id="lastname_fiel"
                  className={styles.formcontrol}
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <p>Número de Telefono</p>
              <div className={styles.divinput}>
                <span>+52</span>
                <input
                  type="text"
                  id="phone_fiel"
                  className={styles.formcontrolphone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            {phoneError && <div className={styles.warning}>{phoneError}</div>}

            <div className={styles.divbutton}>
              <button type="submit" className={styles.button}>
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SetDatas;