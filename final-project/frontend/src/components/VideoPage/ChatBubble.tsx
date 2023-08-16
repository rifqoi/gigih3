import React from "react";

type ChatBubbleType = {
  username: string;
  comment: string;
};

const ChatBubble: React.FC<ChatBubbleType> = ({ username, comment }) => {
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-header ">
          <h2 className="text-xs">{username}</h2>
        </div>
        <div className="chat-bubble">
          <h2 className="text-sm">{comment}</h2>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
