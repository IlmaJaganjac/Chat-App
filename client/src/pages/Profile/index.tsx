import React from "react";
import { useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";  
import { ChatBox } from "./ChatBox";

export const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <>
    <UserProfile />
    <ChatBox />
    </>
  );
};


