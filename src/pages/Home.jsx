import ConversationSidebar from "../components/ConversationsSidebar";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
export default function Home() {
  return (
    <div className="content">
      <Navbar />
      <div className="container">
        <div className="left">
          <ConversationSidebar />
        </div>
        <div className="right">
          <Chat />
        </div>
      </div>
    </div>
  );
}
