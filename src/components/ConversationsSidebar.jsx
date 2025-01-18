import styles from "../styles/conversationSidebar.module.css";
import { Search, UserRound } from "lucide-react";
export default function ConversationSidebar({ conversations }) {
  return (
    <div className={styles["conversations-sidebar"]}>
      <h1 className={styles.header}>Conversations ({conversations.length})</h1>

      <div className={styles["searchbar-container"]}>
        <Search className={styles["search-icon"]} size="25" color="#34495e" />
        <input
          type="text"
          placeholder="Search"
          className={styles["searchbar-inputbox"]}
        />
      </div>
      <ol className={styles.conversations}>
        {conversations.map((conversation) => {
          return (
            <li className={styles["conversation-card"]} key={conversation.id}>
              <div className={styles["msg-card-left"]}>
                <UserRound className={styles["msg-card-pfp"]} size="35" />
              </div>
              <div className={styles["msg-card-right"]}>
                <div className={styles["msg-card-sender-name"]}>
                  {conversation.name} (@{conversation.username})
                </div>
                <div className={styles["msg-card-preview-text"]}>
                  {conversation.test}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
