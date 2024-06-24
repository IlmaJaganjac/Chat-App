// ChatBox.tsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";


const socket = io("http://localhost:5000");

interface Message {
  username: string;
  data: string; // Ensure the property name matches your interface
}

export const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {


    socket.on("message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
  
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    console.log("sending message: ", message);
    const messageData: Message = {
      username: username || "Anonymous",
      data: message, // Ensure 'data' matches the interface
    };
    socket.send(messageData);
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border border-gray-300 rounded-lg p-4 w-full max-w-xl h-80 overflow-y-auto">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message py-2 ">
              <strong>{msg.username}</strong> {msg.data}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center absolute bottom-10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
        
      </div>
    </div>
  );
};


