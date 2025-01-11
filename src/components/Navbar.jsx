import Logo from "../../public/Logo.svg";
import styles from "../styles/navbar.module.css";
import { User } from "lucide-react";
export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <img src={Logo} alt="logo" className={styles.logo} />
      </a>
      <a href="/profile">
        <User className={styles["profile-icon"]} />
      </a>
    </div>
  );
}
