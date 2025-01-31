import styles from "../styles/notification.module.css";
import { CircleX, CircleCheck, CircleHelp } from "lucide-react";
export default function Notification({ type, message }) {
  const handleMessage = (type) => {
    switch (type) {
      case "normal":
        return (
          <div className={styles["normal-msg-container"]}>
            <CircleCheck />
            {message}
          </div>
        );
      case "error":
        return (
          <div className={styles["err-msg-container"]}>
            <CircleX />
            {message}
          </div>
        );
      case "warning":
        return (
          <div className={styles["warning-msg-container"]}>
            <CircleHelp />
            {message}
          </div>
        );
      default:
        return <div className={styles["normal-msg-container"]}>{message}</div>;
    }
  };
  return <>{message != undefined && handleMessage(type)}</>;
}
