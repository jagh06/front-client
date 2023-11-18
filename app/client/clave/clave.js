"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ClaveProporcionada = () => {
  const router = useRouter();
  const [emailAdded, setEmailAdded] = useState("");

  useEffect(() => {
    const emailAdd = localStorage.getItem("mailAdded");
    const data = JSON.parse(emailAdd);
    setEmailAdded(data);
  });

  const [digitosClave, setDigitosClave] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const nuevosDigitos = [...digitosClave];
    nuevosDigitos[index] = value;
    setDigitosClave(nuevosDigitos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar la lógica para enviar y validar los 4 dígitos de la clave recuperada.
    const claveRecuperada = digitosClave.join("");
    console.log("Clave recuperada:", claveRecuperada);

    // Agrega la lógica adicional que necesitas, como enviar la clave al servidor para validarla.
  };

  return (
    <main className="contenedor">
      <div>
        <h4>
          Ingresa la clave que nte enviamos al correo <span>{emailAdded}</span>
        </h4>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              {digitosClave.map((digito, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digito}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </label>

            <button type="submit">Leer clave</button>
          </form>

          <Link href="./new-password" >ir a recuperar pasword</Link>
        </div>
      </div>
    </main>
  );
};

export default ClaveProporcionada;
