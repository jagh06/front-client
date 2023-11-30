"use client";
import React, { useEffect, useState } from "react";
import LayoutClient from "../../components/LayoutClient";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [subs, setSubs] = useState();

  useEffect(() => {
    if (user) {
      setName(user.name);

      const fetchDataStripe = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/clients/id/${user._id}`
          );
          if (response.data.data.subscribed === true) {
            if (response.data.data.plan === "basico") {
              router.push("./administration-panel-basic");
              setSubs(true);
            }
            if (response.data.data.plan === "estandar") {
              router.push("./administration-panel-estandar");
              setSubs(true);
            }
          } else {
            router.push("./no-subscribe");
            setSubs(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDataStripe();
    }
  }, [user]);

  return (
    <LayoutClient>
      <main className="contenedor">
        <p>Esperando...</p>
      </main>
    </LayoutClient>
  );
};

export default Dashboard;

//  http://localhost:3000/client/dashboard/content-manager
