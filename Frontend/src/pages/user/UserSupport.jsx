import { useEffect, useState, useRef } from "react";
import { getSocket } from "../../socket";
import { useAuthStore } from "../../store/authStores";
import api from "../../lib/axios";
import { 
  MessageCircle, 
  Send, 
  User, 
  Headphones,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

const UserSupport = () => {
  const { user } = useAuthStore();
  const socket = getSocket();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    loadMessages();

    socket.emit("joinSupportRoom", user._id);

    socket.on("receiveSupportMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveSupportMessage");
    };

  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/support/user");
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const send = async () => {
    if (!text.trim() || !user) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);
    try {
      socket.emit("sendSupportMessage", {
        userId: user._id,
        senderId: user._id,
        message: text.trim()
      });

      setText("");
      inputRef.current?.focus();
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
        <p className="text-base-content/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Headphones className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Support Chat</h1>
          <p className="text-sm text-base-content/60">Get help from our support team</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-0">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-4 py-3 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary-content text-primary rounded-full w-10 h-10">
                  <Headphones className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Support Team</h3>
                <p className="text-xs opacity-90">We're here to help</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] sm:h-[500px] overflow-y-auto p-4 bg-base-200 space-y-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-base-content/60">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-base-content/50">
                <MessageCircle className="w-12 h-12 mb-2" />
                <p className="text-sm">No messages yet</p>
                <p className="text-xs">Send a message to start the conversation</p>
              </div>
            ) : (
              <>
                {messages.map((m) => {
                  const isOwn = m.sender === user._id;
                  return (
                    <div
                      key={m._id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div
                        className={`flex gap-2 max-w-[85%] sm:max-w-[75%] ${
                          isOwn ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <div className="avatar placeholder flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full ${
                              isOwn ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
                            }`}
                          >
                            {isOwn ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Headphones className="w-4 h-4" />
                            )}
                          </div>
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwn
                              ? "bg-primary text-primary-content rounded-tr-sm"
                              : "bg-base-100 text-base-content rounded-tl-sm shadow-md"
                          }`}
                        >
                          <p className="text-xs font-semibold mb-1 opacity-75">
                            {isOwn ? "You" : "Support"}
                          </p>
                          <p className="text-sm break-words">{m.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-base-100 border-t border-base-300 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                className="input input-bordered flex-1 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSending}
              />
              <button
                className="btn btn-primary gap-2 px-4 sm:px-6"
                onClick={send}
                disabled={isSending || !text.trim()}
              >
                {isSending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="card bg-gradient-to-r from-info/10 to-primary/10 border border-info/20">
        <div className="card-body p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-info/20 rounded-lg flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-info" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Need Help?</h3>
              <p className="text-sm text-base-content/70">
                Our support team is available 24/7 to assist you with any questions or issues you may have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSupport;