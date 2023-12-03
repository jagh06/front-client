"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/dashboard/MyLodging.module.css";
import Image from "next/image";
import { baseURL } from "@/baseUrl";

const MyLodgingEstandar = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [idhotel, setIdHotel] = useState("");
  const [nameowner, setNameOwner] = useState("");
  const [lastnameowner, setLastnameOwner] = useState("");
  const [namehotel, setNameHotel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrecio] = useState("");
  const [phone, setPhone] = useState("");
  const [postalcode, setCP] = useState("");
  const [street, setStreet] = useState("");
  const [streetnumber, setNumCalle] = useState("");
  const [city, setCiudad] = useState("");
  const [images, setImagenes] = useState([]);

  const [idhotelDos, setIdHotelDos] = useState("");
  const [nameownerDos, setNameOwnerDos] = useState("");
  const [lastnameownerDos, setLastnameOwnerDos] = useState("");
  const [namehotelDos, setNameHotelDos] = useState("");
  const [descriptionDos, setDescriptionDos] = useState("");
  const [priceDos, setPrecioDos] = useState("");
  const [phoneDos, setPhoneDos] = useState("");
  const [postalcodeDos, setCPDos] = useState("");
  const [streetDos, setStreetDos] = useState("");
  const [streetnumberDos, setNumCalleDos] = useState("");
  const [cityDos, setCiudadDos] = useState("");
  const [imagesDos, setImagenesDos] = useState([]);

  const [sonDos, setSonDos] = useState(false);

  const [isChecked, setDisponible] = useState(true);
  const [cambioDisponibilidad, setCambioDisponibilidad] = useState(true);

  const [isCheckedDos, setDisponibleDos] = useState(true);
  const [cambioDisponibilidadDos, setCambioDisponibilidadDos] = useState(true);

  useEffect(() => {
    const tokenExists = getCookie("myToken");

    if (user) {
      const fetchDataStripe = async () => {
        try {
          const response = await axios.get(
            `${baseURL}api/hotels/email/${user.email}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenExists}`,
              },
            }
          );
          setDisponible(response.data.data[0].disponible);
          setIdHotel(response.data.data[0]._id);
          setNameOwner(response.data.data[0].nameowner);
          setLastnameOwner(response.data.data[0].lastnameowner);
          setNameHotel(response.data.data[0].namehotel);
          setDescription(response.data.data[0].description);
          setPrecio(response.data.data[0].price);
          setPhone(response.data.data[0].phone);
          setCP(response.data.data[0].postalcode);
          setStreet(response.data.data[0].street);
          setNumCalle(response.data.data[0].streetnumber);
          setCiudad(response.data.data[0].city);
          setImagenes(response.data.data[0].images);
          if (response.data.data[1]) {
            setDisponibleDos(response.data.data[1].disponible);
            setIdHotelDos(response.data.data[1]._id);
            setNameOwnerDos(response.data.data[1].nameowner);
            setLastnameOwnerDos(response.data.data[1].lastnameowner);
            setNameHotelDos(response.data.data[1].namehotel);
            setDescriptionDos(response.data.data[1].description);
            setPrecioDos(response.data.data[1].price);
            setPhoneDos(response.data.data[1].phone);
            setCPDos(response.data.data[1].postalcode);
            setStreetDos(response.data.data[1].street);
            setNumCalleDos(response.data.data[1].streetnumber);
            setCiudadDos(response.data.data[1].city);
            setImagenesDos(response.data.data[1].images);
            setSonDos(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataStripe();
    }
  }, [user]);

  const handleToggle = () => {
    setDisponible(!isChecked);
    setCambioDisponibilidad(!isChecked);
  };

  const handleFormSubmit = async (e) => {
    const tokenExists = getCookie("myToken");
    e.preventDefault();

    const response = await axios.put(
      `${baseURL}api/hotels/${idhotel}`,
      {
        nameowner: nameowner,
        lastnameowner: lastnameowner,
        namehotel: namehotel,
        description: description,
        price: price,
        postalcode: postalcode,
        street: street,
        streetnumber: streetnumber,
        city: city,
        phone: phone,
        disponible: cambioDisponibilidad,
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

  const handleToggleDos = () => {
    setDisponibleDos(!isCheckedDos);
    setCambioDisponibilidadDos(!isCheckedDos);
  };

  const handleFormSubmitDos = async (e) => {
    const tokenExists = getCookie("myToken");
    e.preventDefault();

    const response = await axios.put(
      `${baseURL}api/hotels/${idhotelDos}`,
      {
        nameowner: nameownerDos,
        lastnameowner: lastnameownerDos,
        namehotel: namehotelDos,
        description: descriptionDos,
        price: priceDos,
        postalcode: postalcodeDos,
        street: streetDos,
        streetnumber: streetnumberDos,
        city: cityDos,
        phone: phoneDos,
        disponible: cambioDisponibilidadDos,
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

  const handleAddNewLodging = () => {
    router.push("./add-lodging-estandar");
  };

  const [newFile, setNewFile] = useState(null);

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
  };

  return (
    <div className={styles.block}>
      <div className={styles.mihospedajes}>
        <h3>Mi hospedaje</h3>
      </div>

      <div>
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
                    id="nameowner"
                    value={nameowner}
                    onChange={(e) => setNameOwner(e.target.value)}
                    placeholder="Nombre de propietario"
                    className={styles.formcontrol}
                    required
                  />
                  <input
                    type="text"
                    id="lastnameowner"
                    value={lastnameowner}
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
                    id="price"
                    value={price}
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
                    id="postalcode"
                    value={postalcode}
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
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
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
                    value={streetnumber}
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
                    value={city}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ciudad"
                    className={styles.formcontrol}
                    required
                  />
                </div>
                <div className={styles.items}>
                  <p className={styles.item}>Disponible</p>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                    <span
                      className={`${styles.slider} ${
                        isChecked ? styles.checked : ""
                      }`}
                    />
                  </label>
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
                {images.map((image) => (
                  <Image
                    key={image.public_id}
                    className={styles.imagehotel}
                    alt="Imagen del hotel"
                    src={image.secure_url}
                    width={500}
                    height={500}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {sonDos === true ? (
          <div>
            <div className={styles.contenedor}>
              <form onSubmit={handleFormSubmitDos}>
                <div className={styles.ab}>
                  <div className={styles.cd}>
                    <h3>Detalles</h3>
                    <div className={styles.items}>
                      <p className={styles.item}>Nombre del hotel</p>
                      <input
                        type="text"
                        id="namehotelDos"
                        value={namehotelDos}
                        onChange={(e) => setNameHotelDos(e.target.value)}
                        placeholder="Nombre del hotel"
                        className={styles.formcontrol}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Descripción</p>
                      <textarea
                        rows="6"
                        name="descriptionDos"
                        id="descriptionDos"
                        value={descriptionDos}
                        onChange={(e) => setDescriptionDos(e.target.value)}
                        placeholder="Descripción"
                        className={styles.formtextarea}
                        required
                      ></textarea>
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Propietario</p>
                      <input
                        type="text"
                        id="nameownerDos"
                        value={nameownerDos}
                        onChange={(e) => setNameOwnerDos(e.target.value)}
                        placeholder="Nombre de propietario"
                        className={styles.formcontrol}
                        required
                      />
                      <input
                        type="text"
                        id="lastnameownerDos"
                        value={lastnameownerDos}
                        onChange={(e) => setLastnameOwnerDos(e.target.value)}
                        placeholder="Apellidos"
                        className={styles.formcontrol}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Precio</p>
                      <input
                        type="number"
                        id="priceDos"
                        value={priceDos}
                        onChange={(e) => setPrecioDos(e.target.value)}
                        placeholder="Precio por dia"
                        className={styles.formcontrolnumber}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Teléfono</p>
                      <input
                        type="number"
                        id="phoneDos"
                        value={phoneDos}
                        onChange={(e) => setPhoneDos(e.target.value)}
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
                        id="postalcodeDos"
                        value={postalcodeDos}
                        onChange={(e) => setCPDos(e.target.value)}
                        placeholder="Código postal"
                        className={styles.formcontrolnumber}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Calle</p>
                      <input
                        type="text"
                        id="streetDos"
                        value={streetDos}
                        onChange={(e) => setStreetDos(e.target.value)}
                        placeholder="Calle"
                        className={styles.formcontrol}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Número de calle</p>
                      <input
                        type="number"
                        id="streetnumberDos"
                        value={streetnumberDos}
                        onChange={(e) => setNumCalleDos(e.target.value)}
                        placeholder="Número de calle"
                        className={styles.formcontrolnumber}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Ciudad</p>
                      <input
                        type="text"
                        id="cityDos"
                        value={cityDos}
                        onChange={(e) => setCiudadDos(e.target.value)}
                        placeholder="Ciudad"
                        className={styles.formcontrol}
                        required
                      />
                    </div>
                    <div className={styles.items}>
                      <p className={styles.item}>Disponible</p>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={isCheckedDos}
                          onChange={handleToggleDos}
                        />
                        <span
                          className={`${styles.slider} ${
                            isCheckedDos ? styles.checked : ""
                          }`}
                        />
                      </label>
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
                    {imagesDos.map((image) => (
                      <Image
                        className={styles.imagehotel}
                        alt="Imagen del hotel"
                        key={image.public_id}
                        src={image.secure_url}
                        width={500}
                        height={500}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.mihospedajes}>
              <button
                className={styles.buttonaddnewlodging}
                onClick={handleAddNewLodging}
              >
                Agregar otro hospedaje
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLodgingEstandar;
