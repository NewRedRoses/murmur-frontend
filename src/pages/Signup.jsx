import styles from "../styles/login.module.css";
export default function Signup() {
  return (
    <>
      <div className={styles["signup-container"]}>
        <h1 className={styles.text}>Sign Up</h1>
        <form action="/test" method="post" className={styles["signup-form"]}>
          <div className={styles.input}>
            <label htmlFor="fullname" className={styles.text}>
              Full Name
            </label>
            <input type="text" id="fullname" name="fullname" />
          </div>

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
            Sign Up
          </button>
        </form>
        <div className={styles["login-link"]}>
          <span className={styles.text}>Already have an account?</span>
          <a href="/login">Log In!</a>
        </div>
      </div>
    </>
  );
}
