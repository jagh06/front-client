"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/dashboard/Customer.module.css";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";

const CustomerSuscripcion = () => {
  const { user } = useAuth();
  
  const [datos, setData] = useState(null);
  const [tk, setToken] = useState("")

  useEffect(() => {
    const tokenExists = getCookie("myToken");
    setToken(tokenExists);
    const fetchDataStripe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/subscriptions/strapi-data"
        );
        if (response != null) {
          const sortedPrices = response.data.prices.data.sort(
            (a, b) => a.unit_amount - b.unit_amount
          );
          setData(sortedPrices);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataStripe();
  }, []);

  const handleCheckout = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/subscriptions/strapi-checkout",
        {
          id: id,
          token: tk
        }
      );
      console.log(response.data.url);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("ERROR AL REALIZAR LA COMPRA");
    }
  };

  return (
    <main className="contenedor">
      <div className={styles.main}>
        <div className={styles.h2center}>
          <h2>Selecciona un plan</h2>
        </div>

        {datos != null ? (
          <div className={styles.plandivs}>
            <div key={datos[0].id} className={styles.divplan}>
              <div>
                <h3>{datos[0].nickname}</h3>
                <p className={styles.prices}>
                  <span className={styles.spnamxn}>MXN</span>
                  {datos[0].unit_amount / 100}.00
                </p>
                <button
                  type="submit"
                  className={styles.buttonSelect}
                  onClick={() => {
                    handleCheckout(datos[0].id);
                  }}
                >
                  comprar
                </button>
              </div>
            </div>
            {/* {datos.map((price) => (
             
            ))} */}
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default CustomerSuscripcion;
