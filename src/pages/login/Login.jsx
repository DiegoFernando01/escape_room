import { useState } from "react";
import reactLogo from "/assets/react.svg";
import viteLogo from "/vite.svg";
import ArtonLogo from "/assets/images/ArtonLogo.png";
import styles from "./Login.module.css";
import { UserAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = UserAuth();

  return (
    <div className={styles.example}>
      <div>
        <img src={ArtonLogo} className={styles.logo} alt="Arton Logo" />
      </div>
      <div className={styles.title}>
        <h1 className={styles.title_text}>Login with Gmail</h1>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.card}>
        <button className={styles.button} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
