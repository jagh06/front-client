"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/utils/cookie";
import styles from "../../../styles/dashboard/MyLodging.module.css";
import Image from "next/image";
import axios from "axios";

const MyLodging = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setNameOwner] = useState("");
  const [last, setLastnameOwner] = useState("");
  const [namehotel, setNameHotel] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState("");
  const [phone, setPhone] = useState("");
  const [cp, setCP] = useState("");
  const [calle, setCalle] = useState("");
  const [numerodecalle, setNumCalle] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const tokenExists = getCookie("myToken");
    if (user) {
      if (user) {
        const fetchDataStripe = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3001/api/hotels/email/${user.email}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${tokenExists}`,
                },
              }
            );
            console.log(response.data.data[0]);
            setNameOwner(response.data.data[0].nameowner);
            setLastnameOwner(response.data.data[0].lastnameowner);
            setNameHotel(response.data.data[0].namehotel);
            setDescription(response.data.data[0].description);
            setPrecio(response.data.data[0].price);
            setPhone(response.data.data[0].phone);
            setCP(response.data.data[0].postalcode);
            setCalle(response.data.data[0].street);
            setNumCalle(response.data.data[0].streetnumber);
            setCiudad(response.data.data[0].city);
            setImagenes(response.data.data[0].images);
          } catch (error) {
            console.log(error);
          }
        };
        fetchDataStripe();
      }
    }
  }, [user]);
  return (
    <div className={styles.block}>
      <div className={styles.mihospedajes}>
        <h3>Mi hospedaje</h3>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.ab}>
          <div className={styles.cd}>
            <h3>Detalles</h3>
            <div className={styles.items}>
              <p className={styles.item}>Nombre del hotel</p>
              <p>{namehotel}</p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Descripción</p>
              <p>{description}</p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Propietario</p>
              <p>
                {name} {last}
              </p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Precio</p>
              <p>{precio}</p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Teléfono</p>
              <p>{phone}</p>
            </div>
          </div>
          <div className={styles.cd}>
            <h3>Ubicación</h3>
            <div className={styles.items}>
              <p className={styles.item}>Código Postal</p>
              <p>{cp}</p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Calle</p>
              <p>{calle}</p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Número de calle</p>
              <p>{numerodecalle}</p>
            </div>
            <div className={styles.items}>
              <p className={styles.item}>Ciudad</p>
              <p>{ciudad}</p>
            </div>
          </div>
        </div>
        <div className={styles.ab}>
          <div className={styles.contenedorimages}>
            <h3>Imágenes del hotel</h3>
            <div className={styles.imagesimages}>
              {imagenes.map((image) => (
                <Image
                  alt="Imagen del hotel"
                  key={image.public_id}
                  layout="responsive"
                  src={image.secure_url}
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLodging;
