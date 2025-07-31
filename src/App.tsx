import  { useState } from "react";
import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>🧠 Crux - Chat with your PDF and get amazed</h1>
      <UploadBox onUploadSuccess={() => setIsUploaded(true)} />
      {isUploaded && <ChatBox />}
    </div>
  );
}
