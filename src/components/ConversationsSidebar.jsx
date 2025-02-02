import { useState } from "react";
import styles from "../styles/conversationSidebar.module.css";
import MessageCard from "./MessageCard";
import { Search, MessageSquarePlus } from "lucide-react";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification.jsx";

export default function ConversationSidebar({ conversations }) {
  const [modalShow, setModalShow] = useState(false);
  const [usernameToSearch, setUsernameToSearch] = useState("");
  const [isUsernameFound, setIsUsernameFound] = useState(false);
  const [filteringTerm, setFilteringTerm] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [notification, setNotification] = useState({
    message: undefined,
    type: undefined,
  });

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${apiUrl}api/profile/${usernameToSearch}`;

  const navigate = useNavigate();

  function handleUsernameSearch() {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.status == 200) {
          setIsUsernameFound(true);
          setModalShow(!modalShow);

          navigate(`/chat/${usernameToSearch}`);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err.status == 404) {
          setNotification({ type: "error", message: "Username not found" });
        } else {
          console.log(err);
        }
      });
  }

  function renderAllConversations(conversations) {
    return conversations.map(({ id, name, username }) => {
      return (
        <a href={`/chat/${username}`} key={id}>
          <MessageCard key={id} id={id} name={name} username={username} />
        </a>
      );
    });
  }
  function handleConversationSearch(e) {
    setFilteringTerm(e.target.value);

    // filter & return conversations matching name or username
    const newConvoList = conversations.filter((conversation) => {
      const { name, username } = conversation;
      if (
        name.toLowerCase().includes(filteringTerm) ||
        username.toLowerCase().includes(filteringTerm)
      ) {
        return true;
      }
    });
    setFilteredConversations(newConvoList);
  }
  return (
    <div className={styles["conversations-sidebar"]}>
      <h1 className={styles.header}>
        <span>Conversations ({conversations.length})</span>
        <button
          className={styles["new-conversation-btn"]}
          onClick={() => setModalShow(!modalShow)}
        >
          <MessageSquarePlus size={30} />
        </button>
      </h1>

      {modalShow && (
        <div className="modal-container">
          <Notification
            type={notification.type}
            message={notification.message}
          />
          <Modal
            isOpen={modalShow}
            handleFunc={handleUsernameSearch}
            state={usernameToSearch}
            setState={setUsernameToSearch}
          />
        </div>
      )}

      <div className={styles["searchbar-container"]}>
        <Search className={styles["search-icon"]} size="25" color="#34495e" />
        <input
          type="text"
          placeholder="Search user conversations"
          className={styles["searchbar-inputbox"]}
          value={filteringTerm}
          onChange={handleConversationSearch}
        />
      </div>
      <ol className={styles.conversations}>
        {renderAllConversations(
          filteringTerm != "" ? filteredConversations : conversations,
        )}
      </ol>
    </div>
  );
}
