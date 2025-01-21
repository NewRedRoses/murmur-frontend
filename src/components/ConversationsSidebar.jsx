import styles from "../styles/conversationSidebar.module.css";
import MessageCard from "./MessageCard";
import { Search } from "lucide-react";
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
        {conversations.map(({ id, name, username }) => {
          return (
            <a href={`chat/${username}`} key={id}>
              <MessageCard key={id} id={id} name={name} username={username} />
            </a>
          );
        })}
      </ol>
    </div>
  );
}
