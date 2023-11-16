"use client";
import React, { useState } from "react";
import LayoutClient from "../../components/LayoutClient";
import styles from "../../../styles/dashboard/AddLodging.module.css";
import { baseURL } from "@/baseUrl";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";

const AddLodging = () => {

  const { user } = useAuth();
  
  const [nameowner, setName] = useState(`${user.name}`);
  const [lastnameowner, setLastname] = useState(`${user.lastname}`);
  const [emailowner, setEmail] = useState(`${user.email}`);
  const [namehotel, setNameHotel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [postalcode, setCP] = useState("");
  const [street, setStreet] = useState("");
  const [streetnumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [warningImage, setWarningImage] = useState("");

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("myToken");
    console.log("mi token::", token)

    if (selectedFiles.length === 0) {
      setWarningImage("Selecciona una imagen antes de enviar el formulario");
      console.log("Selecciona una imagen antes de enviar el formulario");
      return;
    }

    const formData = new FormData();
    formData.append("nameowner", nameowner);
    formData.append("lastnameowner", lastnameowner);
    formData.append("emailowner", emailowner);
    formData.append("namehotel", namehotel);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("postalcode", postalcode);
    formData.append("street", street);
    formData.append("streetnumber", streetnumber);
    formData.append("city", city);
    formData.append("phone", phone);

    selectedFiles.forEach((file, index) => {
      console.log(file)
      formData.append(`images`, file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/hotels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos y las imágenes:", error);
    }

    // await submitDataToBackend({
    //   name: `${name}`,
    //   lastname: `${lastname}`,
    //   email: `${email}`,
    //   namehotel: `${nameHotel}`,
    //   description: `${description}`,
    //   price: `${price}`,
    //   postalcode: `${cp}`,
    //   street: `${street}`,
    //   streetnumber: `${streetNumber}`,
    //   city: `${city}`,
    //   phone: `${phone}`,
    // });

    // Clear the form after submission
    // setName("");
    // setLastname("");
    // setEmail("");
    // setNameHotel("");
    // setDescription("");
    // setPrice("");
    // setPhone("");
    // setCP("");
    // setStreet("");
    // setStreetNumber("");
    // setCity("");
  };

  // const submitDataToBackend = async (data) => {
  //   console.log(JSON.stringify(data));
  //   await fetch(`${baseURL}/hotels`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    <LayoutClient pagina="Add Lodging">
      <main className="contenedor">
        <div>
          <div className={styles.divform}>
            <form className={styles.formulario} onSubmit={handleFormSubmit}>
              <div className={styles.d}>
                <div className={styles.divs}>
                  <div className={styles.divpropietario}>
                    <h3>Propietario</h3>
                    <input
                      type="text"
                      id="name"
                      value={nameowner}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre"
                      required
                    />
                    <input
                      type="text"
                      id="lasname"
                      value={lastnameowner}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="Apellidos"
                      required
                    />
                    <input
                      type="email"
                      id="email"
                      value={emailowner}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className={styles.divdetalles}>
                    <h3>Detalles del Hotel</h3>
                    <input
                      type="text"
                      id="nameHotel"
                      value={namehotel}
                      onChange={(e) => setNameHotel(e.target.value)}
                      placeholder="Nombre del hotel"
                      required
                    />
                    <textarea
                      rows="6"
                      name="description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descripcion"
                      required
                    ></textarea>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Precio por habitacon"
                      required
                    />
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Telefono"
                      required
                    />
                  </div>

                  <div className={styles.divubicacion}>
                    <h3>Ubicacion del hotel</h3>
                    <input
                      type="number"
                      id="cp"
                      value={postalcode}
                      onChange={(e) => setCP(e.target.value)}
                      placeholder="Codigo postal"
                      required
                    />
                    <input
                      type="text"
                      id="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Calle"
                      required
                    />
                    <input
                      type="number"
                      id="streetNumber"
                      value={streetnumber}
                      onChange={(e) => setStreetNumber(e.target.value)}
                      placeholder="Numero de Calle"
                      required
                    />
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad"
                      required
                    />
                  </div>
                </div>
                <div className={styles.divs}>
                  <h3>
                    Agrega algunas fotos del hotel y habitaciones 5 imagenes
                    maximo
                  </h3>
                  <input type="file" onChange={handleFileChange} multiple />
                </div>
              </div>
              {warningImage && (
                <div className={styles.warning}>{warningImage}</div>
              )}
              <div>
                <button type="submit" className={styles.buttonForm}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </LayoutClient>
  );
};

export default AddLodging;
