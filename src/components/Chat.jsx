import styles from "../styles/chat.module.css";
import { UserRound, Send } from "lucide-react";
export default function Chat() {
  const messages = [
    {
      id: 1,
      type: "received",
      content: "Hello!",
    },
    { id: 2, type: "sent", content: "whats up?" },
    { id: 3, type: "sent", content: "skibidi toilet rizz" },
    { id: 4, type: "sent", content: "skibidi toilet rizz" },
    { id: 5, type: "sent", content: "skibidi toilet rizz" },
    { id: 6, type: "sent", content: "skibidi toilet rizz" },
    { id: 7, type: "sent", content: "skibidi toilet rizz" },
    { id: 8, type: "sent", content: "skibidi toilet rizz" },
  ];
  return (
    <div className={styles["chat-view"]}>
      <div className={styles["sender-details"]}>
        <div className={styles["sender-details-left"]}>
          <UserRound
            className={styles["msg-card-pfp"]}
            size="35"
            color="#34495E"
          />
        </div>
        <div className={styles["sender-details-mid"]}>
          <div className={styles["sender-name"]}>Test</div>

          <div className={styles["sender-username"]}>@test</div>
        </div>
      </div>
      <ul className={styles["messages-container"]}>
        {messages.map((message) => {
          if (message.type == "received") {
            return (
              <div className={styles["msg-incoming"]} key={message.id}>
                <div className={styles.msg}>{message.content}</div>
              </div>
            );
          } else {
            return (
              <div className={styles["msg-sending"]} key={message.id}>
                <div className={styles.msg}>{message.content}</div>
              </div>
            );
          }
        })}
      </ul>

      <div className={styles["message-composer"]}>
        <textarea name="messageToSend" id="messageToSend" />
        <button type="submit" className={styles["submit-btn"]}>
          <Send color="white" />
        </button>
      </div>
    </div>
  );
}
