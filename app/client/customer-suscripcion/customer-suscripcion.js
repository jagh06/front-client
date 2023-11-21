"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/Customer.module.css";
import axios from "axios";

const CustomerSuscripcion = () => {
  const [datos, setData] = useState(null);

  useEffect(() => {
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
        "http://localhost:3001/api/subscriptions/strapi-checkout",{
          id: id
        }
      );
      console.log("respuesta del back::", response);
    } catch (error) {
      console.log("ERROR AL REALIZAR LA COMPRA")
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
            {datos.map((price) => (
              <div key={price.id} className={styles.divplan}>
                <div>
                  <h3>{price.nickname}</h3>
                  <p className={styles.pe}>1 mes de pueba</p>
                  <p className={styles.prices}>
                    <span className={styles.spnamxn}>MXN</span>
                    {price.unit_amount / 100}.00
                  </p>
                  <button
                    type="submit"
                    className={styles.buttonSelect}
                    onClick={() => {
                      handleCheckout(price.id);
                    }}
                  >
                    comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default CustomerSuscripcion;
