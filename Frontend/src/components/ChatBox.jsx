import { useState, useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStores";

const ChatBox = ({ receiverId }) => {
  const { user } = useAuthStore();
  const { messages, sendMessage, listenMessages } = useChatStore();
  const [text, setText] = useState("");

  useEffect(() => {
    listenMessages();
  }, []);

  const handleSend = () => {
    sendMessage({
      senderId: user.id,
      receiverId,
      message: text
    });
    setText("");
  };

  return (
    <div className="border p-4 rounded mt-4">

      <div className="h-40 overflow-y-auto border mb-2 p-2">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.sender === user.id ? "You" : "Them"}:</strong> {m.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="input input-bordered w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatBox;
