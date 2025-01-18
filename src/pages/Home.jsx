import ConversationSidebar from "../components/ConversationsSidebar";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, redirect } from "react-router-dom";
export default function Home() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}api/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        } else {
          localStorage.clear();
        }
      });
  }, []);

  return (
    <div className="content">
      <Navbar />
      <div className="container">
        <div className="left">
          <ConversationSidebar conversations={messages} />
        </div>
        <div className="right">
          <Chat />
        </div>
      </div>
    </div>
  );
}
