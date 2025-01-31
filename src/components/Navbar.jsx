import axios from "axios";
import Logo from "../../public/Logo.svg";
import styles from "../styles/navbar.module.css";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${apiUrl}api/auth/logout`;
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate(0);
  }
  return (
    <div className={styles.navbar}>
      <a href="/">
        <img src={Logo} alt="logo" className={styles.logo} />
      </a>
      <div className={styles["right"]}>
        <a href="/profile">
          <User className={styles["profile-icon"]} />
        </a>
        <button onClick={handleLogout} className={styles["logout-btn"]}>
          <LogOut className={styles["logout-icon"]} />
        </button>
      </div>
    </div>
  );
}
