import React from "react";
import { useParams } from "react-router-dom";

export const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-xl">{username}</h1> 
    </div>
  );
};
