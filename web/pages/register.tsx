import type { NextPage } from "next";
import { FormEventHandler, useRef, useState } from "react";
import styles from "../styles/Register.module.css";

const Register: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        repeatPassword: repeatPasswordRef.current?.value,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      setError(data.error);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Welcome to TecBook</span>
      <span className={styles.register}>Register</span>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>Error: {error}</div>}
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <input
          type="password"
          placeholder="Repeat password"
          ref={repeatPasswordRef}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
