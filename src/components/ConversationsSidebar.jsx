import styles from "../styles/conversationSidebar.module.css";
import { Search, UserRound } from "lucide-react";
export default function ConversationSidebar() {
  const sampleData = [
    {
      id: 1,
      senderName: "Mateo",
      message: "Lorem ipsum",
    },
    {
      id: 2,
      senderName: "josephine",
      message: "Lorem ipsum",
    },
    {
      id: 3,
      senderName: "luke",
      message: "Lorem ipsum",
    },
    {
      id: 4,
      senderName: "john",
      message: "Lorem ipsum",
    },
    {
      id: 5,
      senderName: "zeke",
      message: "Lorem ipsum",
    },
    {
      id: 6,
      senderName: "abel",
      message: "Lorem ipsum",
    },
  ];

  return (
    <div className={styles["conversations-sidebar"]}>
      <h1 className={styles.header}>Conversations</h1>

      <div className={styles["searchbar-container"]}>
        <Search className={styles["search-icon"]} size="25" color="#34495e" />
        <input
          type="text"
          placeholder="Search"
          className={styles["searchbar-inputbox"]}
        />
      </div>

      <ol className={styles.conversations}>
        {sampleData.map((message) => {
          return (
            <li className={styles["conversation-card"]} key={message.id}>
              <div className={styles["msg-card-left"]}>
                <UserRound className={styles["msg-card-pfp"]} size="35" />
              </div>
              <div className={styles["msg-card-right"]}>
                <div className={styles["msg-card-sender-name"]}>
                  {message.senderName}
                </div>
                <div className={styles["msg-card-preview-text"]}>
                  {message.message}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
