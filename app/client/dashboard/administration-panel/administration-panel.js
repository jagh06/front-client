"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getCookie } from "@/app/utils/cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LayoutClient from "../../components/LayoutClient";
import AddLodging from "../add-lodging/add-lodging";
import MyLodging from "../my-lodging/my-lodging";

const AdministrationPanel = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [lodgingAdded, setLodgingAdded] = useState();

  useEffect(() => {
    const tokenExists = getCookie("myToken");
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
          if (!response.data.data || response.data.data.length === 0) {
            router.push("./add-lodging");
          } else {
            const dataResponse = {
              datas: [response.data.data[0]],
              token: tokenExists,
            };
            router.push("./my-lodging");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataStripe();
    }
  }, [user]);

  return (
    <div>
      <div>Esperando.......</div>
      {/* <div>{lodgingAdded === true ? <MyLodging {...dataResponse}/> : <AddLodging />}</div> */}
    </div>
  );
};

export default AdministrationPanel;
