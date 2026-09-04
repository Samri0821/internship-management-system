import React, { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const interns = [
    {
      id: 1,
      name: "Melkam",
      email: "shomronityirga@gmail.com",
      lastMessage: "I have completed today's task.",
      time: "10:30 AM"
    },
    {
      id: 2,
      name: "Test Intern",
      email: "testintern@gmail.com",
      lastMessage: "Thank you, sir.",
      time: "Yesterday"
    }
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    alert("Message will be connected to the backend.");

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Messages
          </h1>

          <p className="text-gray-500 mt-2">
            Communicate with your assigned interns.
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">

          {/* Intern list */}
          <div className="w-full md:w-1/3 border-r">

            <div className="p-5 border-b">
              <h2 className="font-bold text-gray-800">
                Interns
              </h2>
            </div>

            {interns.map((intern) => (
              <button
                key={intern.id}
                onClick={() => setSelectedChat(intern)}
                className={`w-full text-left p-5 border-b hover:bg-gray-50 ${
                  selectedChat?.id === intern.id
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                <div className="flex gap-3">

                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                    👨‍🎓
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800">
                      {intern.name}
                    </p>

                    <p className="text-sm text-gray-500 truncate">
                      {intern.lastMessage}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {intern.time}
                  </span>

                </div>
              </button>
            ))}

          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">

            {!selectedChat ? (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-6xl mb-4">
                    💬
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    Select an intern
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Select an intern to start a conversation.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat header */}
                <div className="p-5 border-b">
                  <h2 className="font-bold text-gray-800">
                    {selectedChat.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {selectedChat.email}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 bg-gray-50">

                  <div className="flex justify-start mb-4">
                    <div className="bg-white border rounded-2xl rounded-tl-none p-4 max-w-md">
                      <p className="text-gray-700">
                        How is your internship going?
                      </p>

                      <span className="text-xs text-gray-400">
                        10:20 AM
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-md">
                      <p>
                        I have completed today's task.
                      </p>

                      <span className="text-xs opacity-75">
                        10:30 AM
                      </span>
                    </div>
                  </div>

                </div>

                {/* Message input */}
                <div className="p-4 border-t flex gap-3">

                  <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={handleSend}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                  >
                    Send
                  </button>

                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Messages;