"use client";
import React, { useEffect, useState } from "react";
import LayoutClient from "../../components/LayoutClient";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import NoSubscribe from "../no-subscribe/no-subscribe";
import AddLodging from "../add-lodging/add-lodging";
import AdministrationPanel from "../administration-panel/administration-panel";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);
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
          console.log("Suscrito?: ", response.data.data.subscribed);
          if (response.data.data.subscribed === true) {
            router.push("./administration-panel");
            setSubs(true);
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
