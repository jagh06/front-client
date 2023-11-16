import React, { useState, FormEvent, useRef } from "react";
import styles from "../../styles/register/registerclient.module.css";

const Email = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Ingresa tu Email</h3>
      <div className={styles.field}>
        <p>Email</p>
        <div>
          <input
            type="email"
            id="email_fiel"
            className="form_control"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.divbutton}>
        <button type="submit" className={styles.button}>
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default Email;
