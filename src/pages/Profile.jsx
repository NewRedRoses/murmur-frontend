import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../components/Notification";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    status: "",
  });
  const [notification, setNotification] = useState({
    message: undefined,
    type: undefined,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const apiUrl = "http://api.murmur.chat/";
  const url = `${apiUrl}api/auth/profile`;

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setProfileData(response.data);
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          console.log("Forbidden! You ain't got the right");
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.log(error.status);
      });
  }, [url]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(url, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("response on profile submit: ", response.status);
        setNotification({
          type: "normal",
          message: "Changes saved successfully",
        });
      })
      .catch((err) => {
        if (err.status == 500) {
          setNotification({ type: "error", message: err.response.data });
        }
      });
  }

  return (
    <div className={styles["profile-container"]}>
      <Navbar />
      <div className={styles["profile-content"]}>
        <h1 className={styles.header}>Profile</h1>
        <Notification type={notification.type} message={notification.message} />
        <form action="" method="POST" className={styles["profile-form"]}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={(e) =>
              setProfileData({ ...profileData, username: e.target.value })
            }
          />

          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={profileData.status}
            onChange={(e) =>
              setProfileData({ ...profileData, status: e.target.value })
            }
          />
          <button
            type="submit"
            className={styles["submit-btn"]}
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
