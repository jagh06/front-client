"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import crypto from "crypto";
import { setCookie } from "@/app/utils/cookie";

const Verify = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    try {
      const token = urlParams.get("temporary");
      const decipher = crypto.createDecipher(
        "aes-256-cbc",
        "mi-claver-secreta-cypher"
      );
      let tokenDescifrado = decipher.update(token, "hex", "utf-8");
      tokenDescifrado += decipher.final("utf-8");
      if (tokenDescifrado) {
        setCookie("myToken", tokenDescifrado, { expires: 1 });
        router.push(`/client/dashboard/content-manager`);
      }
    } catch (error) {
      router.push("/");
    }
  }, []);
  return <div>Vericando...</div>;
};

export default Verify;
