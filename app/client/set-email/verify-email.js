"use client";
import { useRouter } from "next/navigation";
import Email from "./set-email";
import { useState } from "react";
import styles from "../../styles/register/registerclient.module.css";
import { baseURL } from "@/baseUrl";

const fetchData = async (query) => {
  const response = await fetch(`${baseURL}api/clients/email/${query}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch data from the API");
  }
};

export default function SetEmail() {
  const [data, setData] = useState(null);
  const [registrationExists, setRegistrationExists] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (query) => {
    try {
      const result = await fetchData(query);
      localStorage.setItem("emailAdded", JSON.stringify(query));

      if (result.data === null) {
        router.push("./set-datas");
      } else {
        setRegistrationExists(true);
      }
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="contenedor">
      <div className={styles.registerclient}>
        <div className={styles.backgroung}>
          <Email onSubmit={handleFormSubmit} />
        </div>
        <div className={styles.pmensaje}>
          {registrationExists ? (
            <p className={styles.mesaggeExists}>Esta cuenta está en uso.</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
