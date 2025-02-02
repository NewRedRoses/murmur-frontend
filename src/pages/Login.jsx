import { useState } from "react";
import Logo from "../../public/Logo.svg";
import styles from "../styles/login.module.css";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";

export default function Login({ onLogIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState({
    message: undefined,
    type: undefined,
  });
  const apiUrl = "https://api.murmur.chat/";
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      await axios
        .post(
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
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            onLogIn();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            type: "error",
            message: err.response.data.message,
          });
        });
    } catch (err) {
      console.log(err);
      setNotification({
        type: "error",
        message: err.response.data.message,
      });
    }
  }

  return (
    <div className={styles["login-container"]}>
      <img src={Logo} alt="logo" className={styles.logo} />
      <h1 className={styles.text}>Login</h1>

      <Notification type={notification.type} message={notification.message} />

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
        <Link to="/signup">Sign up! </Link>
      </div>
    </div>
  );
}
