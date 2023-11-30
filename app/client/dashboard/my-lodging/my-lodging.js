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

  const [idhotel, setIdHotel] = useState("");
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
    const fetchSuscriptores = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/subscriptions/listar-suscriptores"
      );
    };
    fetchSuscriptores();
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
            setIdHotel(response.data.data[0]._id);
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

  const handleFormSubmit = async (e) => {
    const tokenExists = getCookie("myToken");
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:3001/api/hotels/${idhotel}`,
      {
        nameowner: name,
        lastnameowner: last,
        namehotel: namehotel,
        description: description,
        price: precio,
        postalcode: cp,
        street: calle,
        streetnumber: numerodecalle,
        city: ciudad,
        phone: phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenExists}`,
        },
      }
    );
    if (response.status === 200) {
      router.push("");
    }
  };

  return (
    <div className={styles.block}>
      <div className={styles.mihospedajes}>
        <h3>Mi hospedaje</h3>
      </div>
      <div className={styles.contenedor}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.ab}>
            <div className={styles.cd}>
              <h3>Detalles</h3>
              <div className={styles.items}>
                <p className={styles.item}>Nombre del hotel</p>
                <input
                  type="text"
                  id="namehotel"
                  value={namehotel}
                  onChange={(e) => setNameHotel(e.target.value)}
                  placeholder="Nombre del hotel"
                  className={styles.formcontrol}
                  required
                />
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Descripción</p>
                <textarea
                  rows="6"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción"
                  className={styles.formtextarea}
                  required
                ></textarea>
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Propietario</p>

                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setNameOwner(e.target.value)}
                  placeholder="Nombre de propietario"
                  className={styles.formcontrol}
                  required
                />
                <input
                  type="text"
                  id="lastname"
                  value={last}
                  onChange={(e) => setLastnameOwner(e.target.value)}
                  placeholder="Apellidos"
                  className={styles.formcontrol}
                  required
                />
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Precio</p>
                <input
                  type="number"
                  id="precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Precio por dia"
                  className={styles.formcontrolnumber}
                  required
                />
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Teléfono</p>
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Teléfono"
                  className={styles.formcontrolnumber}
                  required
                />
              </div>
            </div>
            <div className={styles.cd}>
              <h3>Ubicación</h3>
              <div className={styles.items}>
                <p className={styles.item}>Código Postal</p>
                <input
                  type="number"
                  id="cp"
                  value={cp}
                  onChange={(e) => setCP(e.target.value)}
                  placeholder="Código postal"
                  className={styles.formcontrolnumber}
                  required
                />
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Calle</p>
                <input
                  type="text"
                  id="street"
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  placeholder="Calle"
                  className={styles.formcontrol}
                  required
                />
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Número de calle</p>
                <input
                  type="number"
                  id="streetnumber"
                  value={numerodecalle}
                  onChange={(e) => setNumCalle(e.target.value)}
                  placeholder="Número de calle"
                  className={styles.formcontrolnumber}
                  required
                />
              </div>
              <div className={styles.items}>
                <p className={styles.item}>Ciudad</p>
                <input
                  type="text"
                  id="city"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ciudad"
                  className={styles.formcontrol}
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.divbutton}>
            <button type="submit" className={styles.buttonForm}>
              Actualizar
            </button>
          </div>
        </form>

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
