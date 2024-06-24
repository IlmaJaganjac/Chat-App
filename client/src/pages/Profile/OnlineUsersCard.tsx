// OnlineUsersCard.tsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

export const OnlineUsersCard: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("set_online", username);
    });

    socket.on("disconnect", () => {
      socket.emit("set_offline", username);
    });

    socket.on("updateOnlineUsers", (updatedOnlineUsers: string[]) => {
      const filteredUsers = updatedOnlineUsers.filter(user => user !== username);
      setOnlineUsers(filteredUsers);
    });

    const handleBeforeUnload = () => {
        socket.emit("set_offline", username);
        socket.disconnect();
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  

    return () => {
      socket.off("updateOnlineUsers");
      socket.off("connect");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username]);

  const signOut = () => {
    socket.emit("set_offline", username);   
    socket.disconnect();
    return (window.location.href = "/");
  };

  return (
    <div className="absolute top-10 right-10">
      <h2>Online Users:</h2>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <button
        onClick={signOut}
        className="p-2 bg-red-500 text-white rounded-md mt-4"
      >
        Sign Out
      </button>
    </div>
  );
};
