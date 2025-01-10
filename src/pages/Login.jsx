import Logo from "../../public/Logo.svg";
import styles from "../styles/login.module.css";
export default function Login() {
  return (
    <div className="content">
      <img src={Logo} alt="logo" className={styles.logo} />
      <h1 className={styles.text}>Login</h1>
      <form action="/test" method="post">
        <label htmlFor="username" className={styles.text}>
          Username
        </label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password" className={styles.text}>
          Password
        </label>
        <input type="password" id="password" name="password" />

        <button type="submit">Log In</button>
      </form>
      <div className="signup-redirect">
        <span className={styles.text}>New?</span>
        <a href="/signup">Sign Up!</a>
      </div>
    </div>
  );
}
