import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Comments, GetCommentsByVideoAPI } from "../../types/Comment";
import ChatBubble from "./ChatBubble";
import axios from "axios";
import { BASE_URL } from "../../config";

type ChatContainerType = {
  videoID: number;
};

const ChatContainer: React.FC<ChatContainerType> = ({ videoID }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState<string>();
  const [comment, setComment] = useState<string>();

  const [comments, setComments] = useState<Comments[]>();

  const getComments = () => {
    axios
      .get<GetCommentsByVideoAPI>(`${BASE_URL}/comments/video/${videoID}`)
      .then((value) => {
        setComments(value.data.data);
      })
      .then(() => {});
  };

  const sendComment = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!username) {
      return;
    }

    if (!comment) {
      return;
    }

    if (commentInputRef.current) {
      commentInputRef.current.value = "";
    }

    axios
      .post(`${BASE_URL}/comments/video/${videoID}`, {
        username: username,
        comment: comment,
      })
      .then((_) => {
        getComments();
        setComment("");
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [comments]);

  return (
    <div className="flex h-[700px] w-80 flex-col justify-start rounded-md border-2 border-zinc-800">
      <h2 className="m-3 border-b-2 border-zinc-800 p-3 text-gray-100">Chat</h2>
      <div
        ref={chatBoxRef}
        className="flex h-[700px] flex-col gap-2 overflow-y-auto p-3"
      >
        {comments && (
          <>
            {comments.map((comment) => (
              <ChatBubble
                // key={comment.id}
                username={comment.username}
                comment={comment.comment}
              />
            ))}
          </>
        )}
      </div>

      <form
        ref={formRef}
        className="flex flex-col border-t-2 border-zinc-800"
        onSubmit={sendComment}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className={`input w-full max-w-xs border-b-2 bg-zinc-900 text-sm focus:outline-none`}
        />

        <input
          type="text"
          placeholder="Comment"
          ref={commentInputRef}
          name="comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="input w-full max-w-xs rounded-none border-t-2 border-zinc-700 bg-zinc-900 text-sm focus:outline-none"
        />

        <button className="rounded-md bg-zinc-700 p-2">
          <h2 className="p-0 text-sm font-bold text-white">Send</h2>
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
