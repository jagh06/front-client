"use client";
import React, { useEffect } from "react";
import LayoutClient from "../components/LayoutClient";
import { setCookie } from "@/app/utils/cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    try {
      const token = urlParams.get("temporary");
      setCookie("myToken", token);
      const payload = jwt.decode(token);
      if (payload._id) {
        const fetchData = async () => {
          const response = await axios.post(
            `http://localhost:3001/api/clients/upstatesub/${payload._id}`
          );
          console.log(response.data.usuarioActualizado.subscribed);
          if (response.data.usuarioActualizado.subscribed === true) {
            router.push("./dashboard/content-manager");
          }
        };
        fetchData();
      }
    } catch (error) {
      console.log("ERROR_POST");
    }
  }, []);
  return (
    <LayoutClient>
      <main className="contendor">
        <div>Success...</div>
      </main>
    </LayoutClient>
  );
};

export default Success;
