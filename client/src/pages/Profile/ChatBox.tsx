import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";

const socket = io('http://localhost:5000');

interface Message {
  username: string;
  data: string; // Ensure the property name matches your interface
}

export const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    console.log('sending message: ', message);
    const messageData: Message = {
      username: username || 'Anonymous',
      data: message // Ensure 'data' matches the interface
    };
    socket.send(messageData);
    setMessage('');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.data}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input"
      />
      <button onClick={sendMessage} className="btn">
        Send
      </button>
    </div>
  );
};
