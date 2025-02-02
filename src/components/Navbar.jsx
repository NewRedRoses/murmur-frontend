import axios from "axios";
import Logo from "../../public/Logo.svg";
import styles from "../styles/navbar.module.css";
import { User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const apiUrl = "https://api.murmur.chat/";
  const url = `${apiUrl}api/auth/logout`;
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate(0);
  }
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src={Logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles["right"]}>
        <Link to="/profile">
          <User className={styles["profile-icon"]} />
        </Link>
        <button onClick={handleLogout} className={styles["logout-btn"]}>
          <LogOut className={styles["logout-icon"]} />
        </button>
      </div>
    </div>
  );
}
