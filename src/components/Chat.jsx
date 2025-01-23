import axios from "axios";
import styles from "../styles/chat.module.css";
import { UserRound, Send, MessageCircleOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message.jsx";

export default function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${apiUrl}api/messages/chat/${username}`;

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { loggedInUserId, messages } = response.data;
        if (response.status == 200) {
          setMessages(messages);
          setLoggedInUserId(loggedInUserId);
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          console.log("Forbidden! You ain't got the right");
          localStorage.removeItem("token");
          navigate("login");
        }
        console.log(error.status);
      });
  }, [url]);

  return username ? (
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
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            type={message.senderId == loggedInUserId ? "sent" : "received"}
            content={message.content}
          />
        ))}
      </ul>
      <div className={styles["message-composer"]}>
        <textarea name="messageToSend" id="messageToSend" />
        <button type="submit" className={styles["submit-btn"]}>
          <Send color="white" />
        </button>
      </div>
    </div>
  ) : (
    <div className={`${styles["chat-view"]} ${styles.empty}`}>
      <MessageCircleOff color="#34495e" size="70" />
      <div className={styles["chat-view-msg"]}>No open chats</div>
    </div>
  );
}
