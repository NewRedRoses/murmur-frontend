import ConversationSidebar from "../components/ConversationsSidebar";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="content">
      <Navbar />
      <ConversationSidebar />
    </div>
  );
}
