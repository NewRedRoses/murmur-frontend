import Logo from "../../public/Logo.svg";
import styles from "../styles/login.module.css";
export default function Login() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  return (
    <div className={styles["login-container"]}>
      <img src={Logo} alt="logo" className={styles.logo} />
      <h1 className={styles.text}>Login</h1>
      <form
        action={apiUrl + "api/auth/login"}
        method="post"
        className={styles["login-form"]}
      >
        <div className={styles.input}>
          <label htmlFor="username" className={styles.text}>
            Username
          </label>
          <input type="text" id="username" name="username" />
        </div>
        <div className={styles.input}>
          <label htmlFor="password" className={styles.text}>
            Password
          </label>
          <input type="password" id="password" name="password" />
        </div>

        <button type="submit" className={styles["submit-btn"]}>
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
