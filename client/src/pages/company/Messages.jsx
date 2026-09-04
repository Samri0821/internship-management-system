import React, { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Melkam",
      role: "Intern",
      lastMessage: "Thank you for the information.",
      unread: 2,
      messages: [
        {
          sender: "intern",
          text: "Hello, I wanted to ask about the internship.",
          time: "09:30 AM",
        },
        {
          sender: "company",
          text: "Hello Melkam. How can I help you?",
          time: "09:35 AM",
        },
        {
          sender: "intern",
          text: "Thank you for the information.",
          time: "09:40 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Abebe Kebede",
      role: "Intern",
      lastMessage: "I will join the interview.",
      unread: 0,
      messages: [
        {
          sender: "company",
          text: "Your interview is scheduled for tomorrow.",
          time: "Yesterday",
        },
        {
          sender: "intern",
          text: "I will join the interview.",
          time: "Yesterday",
        },
      ],
    },
    {
      id: 3,
      name: "Sara Alemu",
      role: "Intern",
      lastMessage: "Can I submit my report tomorrow?",
      unread: 1,
      messages: [
        {
          sender: "intern",
          text: "Can I submit my report tomorrow?",
          time: "08:20 AM",
        },
      ],
    },
  ]);

  const currentChat = conversations[selectedChat];

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      sender: "company",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((current) =>
      current.map((conversation, index) =>
        index === selectedChat
          ? {
              ...conversation,
              lastMessage: newMessage.text,
              messages: [...conversation.messages, newMessage],
            }
          : conversation
      )
    );

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Messages</h1>

        <p className="mt-2 text-gray-600">
          Communicate with interns and manage your conversations.
        </p>
      </div>

      <div className="grid h-[650px] grid-cols-1 overflow-hidden rounded-xl bg-white shadow-sm lg:grid-cols-3">
        {/* Conversations */}
        <div className="border-r">
          <div className="border-b p-5">
            <h2 className="text-lg font-bold text-gray-800">
              Conversations
            </h2>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conversation, index) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedChat(index)}
                className={`w-full border-b p-4 text-left transition ${
                  selectedChat === index
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {conversation.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-800">
                        {conversation.name}
                      </h3>

                      {conversation.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      {conversation.role}
                    </p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex flex-col lg:col-span-2">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {currentChat.name.charAt(0)}
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                {currentChat.name}
              </h2>

              <p className="text-sm text-gray-500">
                {currentChat.role}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5">
            {currentChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "company"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.sender === "company"
                      ? "rounded-br-none bg-blue-600 text-white"
                      : "rounded-bl-none bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>

                  <p
                    className={`mt-1 text-xs ${
                      msg.sender === "company"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Send Message */}
          <form
            onSubmit={sendMessage}
            className="flex gap-3 border-t p-4"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;