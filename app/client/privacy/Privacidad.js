"use client";
import React, { useState } from "react";
import styles from "../../styles/privacy/Privacy.module.css";
import { useRouter } from 'next/navigation';

const Privacidad = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <main className="contenedor">
      <div className={styles.divprincipal}>
        <div className={styles.divprivacy}>
          <div>
            <h2>Acuerdos y Avisos de Privacidad</h2>
          </div>
          <div>
            <p>
              Bienvenido a Turingo Space. Agradecemos tu confianza en nosotros.
              Nos comprometemos a proteger y respetar tu privacidad. Al utilizar
              nuestros servicios, aceptas las prácticas descritas en este
              documento.
            </p>
          </div>

          <div>
            <h3> Información que Recopilamos:</h3>
          </div>
          <div>
            <p>
              Recopilamos información personal que nos proporcionas
              voluntariamente, incluyendo, pero no limitándonos a:
            </p>
            <ul>
              <li>Nombre</li>
              <li>Teléfono</li>
              <li>Ubicación</li>
              <li>Correo Electrónico</li>
            </ul>
          </div>
          <div>
            <h3>Uso de la Información:</h3>
          </div>
          <div>
            <p>La información recopilada se utiliza para:</p>
            <ul>
              <li>Proveer y mejorar nuestros servicios.</li>
              <li>Personalizar tu experiencia.</li>
              <li>Enviar información relevante y actualizaciones.</li>
            </ul>
          </div>
          <div>
            <h3> Almacenamiento de Datos:</h3>
          </div>
          <div>
            <p>
              Tus datos personales se almacenan de manera segura y solo se
              retienen durante el tiempo necesario para cumplir con los fines
              para los cuales se recopilaron. Implementamos medidas de seguridad
              para proteger tu información contra accesos no autorizados,
              alteración, divulgación o destrucción no autorizada.
            </p>
          </div>
          <div>
            <h3>Compartir Información:</h3>
          </div>
          <div>
            <p>
              No compartimos tus datos personales con terceros sin tu
              consentimiento, excepto cuando sea necesario para cumplir con
              obligaciones legales.
            </p>
          </div>
          <div>
            <h3>Derechos del Usuario:</h3>
          </div>
          <div>
            <p>Tienes derecho a:</p>
            <ul>
              <li>Acceder a tus datos personales</li>
              <li>Rectificar la información inexacta</li>
              <li>Eliminar tus datos personales</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Portabilidad de tus datos personales</li>
            </ul>
          </div>
          <div>
            <h3>Consentimiento:</h3>
          </div>
          <div>
            <p>
              Al utilizar nuestros servicios, aceptas la recopilación, uso y
              almacenamiento de tus datos personales según lo establecido en
              estos acuerdos y avisos de privacidad. Para ejercer tus derechos o
              para cualquier pregunta relacionada con la privacidad, contacta
              con nosotros a través de <span>turingospace.team@gmail.com</span>.
            </p>
          </div>

          <div className={styles.divbutton}>
            <button className={styles.buttonsig} onClick={handleClick}>Aceptar</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Privacidad;
