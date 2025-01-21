import styles from "../styles/conversationSidebar.module.css";
import { UserRound } from "lucide-react";
export default function MessageCard({ id, name, username }) {
  return (
    <li className={styles["conversation-card"]} key={id}>
      <div className={styles["msg-card-left"]}>
        <UserRound className={styles["msg-card-pfp"]} size="35" />
      </div>
      <div className={styles["msg-card-right"]}>
        <div
          href={`chat/${username}`}
          className={styles["msg-card-sender-name"]}
        >
          {name} (@{username})
        </div>
        <div className={styles["msg-card-preview-text"]}>lorem ipsumm </div>
      </div>
    </li>
  );
}
