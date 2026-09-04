import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Messages = () => {
  const [internship, setInternship] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD INTERNSHIP AND CHAT
  // ==========================================
  useEffect(() => {
    loadChat();
  }, []);

  const loadChat = async () => {
    try {
      setLoading(true);
      setError("");

      // Get intern's assigned internship
      const internshipResponse = await api.get("/internships/my");

      const internships =
        internshipResponse.data.internships || [];

      if (internships.length === 0) {
        setError("You do not have an assigned internship yet.");
        setLoading(false);
        return;
      }

      // Use active/upcoming internship
      const currentInternship =
        internships.find(
          (item) =>
            item.status === "active" ||
            item.status === "upcoming"
        ) || internships[0];

      setInternship(currentInternship);

      // Make sure a supervisor is assigned
      if (!currentInternship.supervisor) {
        setError(
          "Your internship does not have a supervisor assigned yet."
        );
        setLoading(false);
        return;
      }

      // Load chat history
      const chatResponse = await api.get(
        `/messages/${currentInternship._id}`
      );

      setMessages(chatResponse.data.messages || []);
    } catch (err) {
      console.error("Load chat error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEND MESSAGE
  // ==========================================
  const handleSend = async () => {
    if (!message.trim()) {
      return;
    }

    if (!internship || !internship.supervisor) {
      setError("No supervisor is assigned to this internship.");
      return;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post("/messages", {
        receiver: internship.supervisor._id,
        internship: internship._id,
        message: message.trim()
      });

      // Add newly sent message to chat
      setMessages((prev) => [
        ...prev,
        response.data.chatMessage
      ]);

      setMessage("");
    } catch (err) {
      console.error("Send message error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
            <div className="text-4xl mb-4">💬</div>

            <h2 className="text-xl font-semibold text-gray-800">
              Loading messages...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load your supervisor chat.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN PAGE
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Messages
          </h1>

          <p className="text-gray-500 mt-2">
            Communicate with your internship supervisor.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {!internship ? (
          <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
            <div className="text-6xl mb-4">
              💬
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No internship assigned
            </h2>

            <p className="text-gray-500 mt-2">
              You can start chatting once an internship
              and supervisor are assigned to you.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

            {/* Chat Header */}
            <div className="p-5 border-b bg-white">
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  👨‍💼
                </div>

                <div>
                  <h2 className="font-bold text-gray-800 text-lg">
                    {internship.supervisor?.name ||
                      "Supervisor"}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {internship.supervisor?.email ||
                      "Supervisor"}
                  </p>
                </div>

              </div>
            </div>

            {/* Internship Information */}
            <div className="px-5 py-3 bg-blue-50 border-b">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">
                  Internship:
                </span>{" "}
                {internship.organization} -{" "}
                {internship.position}
              </p>
            </div>

            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-5 bg-gray-50">

              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <div className="text-6xl mb-4">
                      💬
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700">
                      No messages yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Start a conversation with your supervisor.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {

                  const isMine =
                    msg.sender?._id ===
                    localStorage.getItem("userId");

                  return (
                    <div
                      key={msg._id}
                      className={`flex mb-4 ${
                        isMine
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                          isMine
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-white border text-gray-700 rounded-tl-none"
                        }`}
                      >
                        <p className="break-words">
                          {msg.message}
                        </p>

                        <div
                          className={`text-xs mt-2 ${
                            isMine
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-3">

                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !sending) {
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  disabled={sending}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={handleSend}
                  disabled={sending || !message.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Send"}
                </button>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Messages;