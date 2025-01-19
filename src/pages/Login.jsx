import { useState } from "react";
import Logo from "../../public/Logo.svg";
import styles from "../styles/login.module.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${apiUrl}api/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        onLogIn();
        navigate("/");
      } else {
        alert("Login Failure");
      }
    } catch (err) {
      console.log(err);
      alert("Unable to login");
    }
  }

  return (
    <div className={styles["login-container"]}>
      <img src={Logo} alt="logo" className={styles.logo} />
      <h1 className={styles.text}>Login</h1>

      <form className={styles["login-form"]}>
        <div className={styles.input}>
          <label htmlFor="username" className={styles.text}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password" className={styles.text}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={styles["submit-btn"]}
          onClick={handleLogin}
        >
          Log In
        </button>
      </form>
      <div className={styles["signup-link"]}>
        <span className={styles.text}>New?</span>
        <a href="/signup">Sign Up!</a>
      </div>
    </div>
  );
}
