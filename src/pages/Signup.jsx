import axios from "axios";
import styles from "../styles/login.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";

export default function Signup() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${apiUrl}api/auth/signup`;

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState();
  const [notification, setNotification] = useState({
    message: undefined,
    type: undefined,
  });

  const navigate = useNavigate();

  function handleSignup() {
    axios
      .post(url, form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setNotification({
            type: "normal",
            message: "Account created successfully.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 403) {
          setNotification({
            type: "error",
            message:
              "Something went wrong. Please ensure all input forms are filled in.",
          });
        }
      });
  }

  return (
    <>
      <div className={styles["signup-container"]}>
        <h1 className={styles.text}>Sign Up</h1>
        <Notification type={notification.type} message={notification.message} />

        <div className={styles["signup-form"]}>
          <div className={styles.input}>
            <label htmlFor="fullname" className={styles.text}>
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={form.fullname}
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="username" className={styles.text}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={styles["submit-btn"]}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
        <div className={styles["login-link"]}>
          <span className={styles.text}>Already have an account?</span>
          <Link to="/login">Log In!</Link>
        </div>
      </div>
    </>
  );
}
