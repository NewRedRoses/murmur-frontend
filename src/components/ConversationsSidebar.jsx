import { useState } from "react";
import styles from "../styles/conversationSidebar.module.css";
import MessageCard from "./MessageCard";
import { Search, MessageSquarePlus } from "lucide-react";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConversationSidebar({ conversations }) {
  const [modalShow, setModalShow] = useState(false);
  const [usernameToSearch, setUsernameToSearch] = useState("");
  const [isUsernameFound, setIsUsernameFound] = useState(false);
  const [filteringTerm, setFilteringTerm] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${apiUrl}api/profile/${usernameToSearch}`;

  const navigate = useNavigate();

  function handleModal() {
    setModalShow(!modalShow);
  }
  function handleUsernameSearch() {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // TODO: check if search user is the same as user logged in
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
          // TODO: display UI  error indicating user not found
          console.log("username not found");
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
          onClick={handleModal}
        >
          <MessageSquarePlus size={30} />
        </button>
      </h1>

      <Modal
        isOpen={modalShow}
        handleFunc={handleUsernameSearch}
        state={usernameToSearch}
        setState={setUsernameToSearch}
      />
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
