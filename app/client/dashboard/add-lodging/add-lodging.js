"use client";
import React, { useEffect, useState } from "react";
import LayoutClient from "../../components/LayoutClient";
import styles from "../../../styles/dashboard/AddLodging.module.css";
import { baseURL } from "@/baseUrl";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import Image from "next/image";

const AddLodging = () => {  
  const [nameowner, setName] = useState("");
  const [lastnameowner, setLastName] = useState("");
  const [emailowner, setEmail] = useState("");
  const [namehotel, setNameHotel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [postalcode, setCP] = useState("");
  const [street, setStreet] = useState("");
  const [streetnumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [warningImage, setWarningImage] = useState("");
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLastName(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);

    const previews = filesArray.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then((previewUrl) => {
      setImagePreviews(previewUrl);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("myToken");

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
      console.log(file);
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
  };

  return (
    <LayoutClient pagina="Add Lodging">
      <main className="contenedor">
        <div className={styles.divform}>
          <form className={styles.formulario} onSubmit={handleFormSubmit}>
            <div className={styles.d}>
              <div className={styles.divsone}>
                <div className={styles.divpropietario}>
                  <h3>Propietario</h3>
                  <input
                    type="text"
                    id="name"
                    value={nameowner}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className={styles.formcontrol}
                    required
                  />
                  <input
                    type="text"
                    id="lasname"
                    value={lastnameowner}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Apellidos"
                    className={styles.formcontrol}
                    required
                  />
                  <input
                    type="email"
                    id="email"
                    value={emailowner}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={styles.formcontrol}
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
                    className={styles.formcontrol}
                    required
                  />
                  <textarea
                    rows="6"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripcion"
                    className={styles.formtextarea}
                    required
                  ></textarea>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Precio por habitacon"
                    className={styles.formcontrolnumber}
                    required
                  />
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefono"
                    className={styles.formcontrol}
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
                    className={styles.formcontrolnumber}
                    required
                  />
                  <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Calle"
                    className={styles.formcontrol}
                    required
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    id="streetNumber"
                    value={streetnumber}
                    onChange={(e) => setStreetNumber(e.target.value)}
                    placeholder="Numero de Calle"
                    className={styles.formcontrolnumber}
                    required
                  />
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ciudad"
                    className={styles.formcontrol}
                    required
                  />
                </div>
              </div>
              <div className={styles.divstwo}>
                <h3>
                  Agrega algunas fotos del hotel y habitaciones 5 imagenes
                  maximo
                </h3>
                <input
                  type="file"
                  className={styles.inputimages}
                  onChange={handleFileChange}
                  multiple
                />
                <div className={styles.images}>
                  {imagePreviews.map((preview, index) => {
                    return (
                      <Image
                        className={styles.image}
                        key={index}
                        src={preview}
                        alt={`Preview ${index}`}
                        width={220}
                        height={220}
                      />
                    );
                  })}
                </div>
                {warningImage && (
                  <div className={styles.warning}>{warningImage}</div>
                )}
              </div>
            </div>

            <div className={styles.divbutton}>
              <button type="submit" className={styles.buttonForm}>
                Agregar hospedjge
              </button>
            </div>
          </form>
        </div>
      </main>
    </LayoutClient>
  );
};

export default AddLodging;
