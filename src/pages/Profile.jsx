import Navbar from "../components/Navbar";
import styles from "../styles/profile.module.css";

export default function Profile() {
  return (
    <div className={styles["profile-container"]}>
      <Navbar />
      <div className={styles["profile-content"]}>
        <h1 className={styles.header}>Profile</h1>
        <form action="" method="POST" className={styles["profile-form"]}>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" name="fullname" />

          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" />
          <button type="submit" className={styles["submit-btn"]}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
