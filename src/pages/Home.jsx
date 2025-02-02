import ConversationSidebar from "../components/ConversationsSidebar";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Home({ setIsLoggedIn }) {
  const apiUrl = "https://api.murmur.chat/";
  const url = `${apiUrl}api/messages`;
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const params = useParams();

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          console.log("Forbidden! You ain't got the right");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/login");
        }
        console.log(error.status);
      });
  }, [url]);

  return (
    <div className="content">
      <Navbar />
      <div className="container">
        <div className="left">
          <ConversationSidebar conversations={messages} />
        </div>
        <div className="right">
          <Chat username={params.username} />
        </div>
      </div>
    </div>
  );
}
