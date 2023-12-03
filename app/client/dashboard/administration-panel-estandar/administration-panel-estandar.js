"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import { baseURL } from "@/baseUrl";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdministrationPanelEstandar = () => {
  const router = useRouter();
  const { user } = useAuth();

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
          if (!response.data.data || response.data.data.length === 0) {
            router.push("./add-lodging-estandar");
          } else {
            const dataResponse = {
              datas: [response.data.data[0]],
              token: tokenExists,
            };
            router.push("./my-lodging-estandar");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataStripe();
    }
  }, []);

  return (
    <div>
      <div>Esperando.......</div>
    </div>
  );
};

export default AdministrationPanelEstandar;
