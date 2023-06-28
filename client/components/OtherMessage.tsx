"use client";

import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import moment from "moment";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

const OtherMessage = () => {
  const user = useAuthStore((state: any) => state.user);
  const userId = user && user._id;
  const token = useAuthStore((state: any) => state.token);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [commentsContent, setCommentsContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const router = useRouter();

  const handleReplyClick = (commentId: any) => {
    setSelectedCommentId(commentId);
  };

  const handleInputChange = (event: any) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://shared-server.onrender.com/api/auth/user/comments/${selectedCommentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId, // Replace with the actual user ID
            content: replyText,
          }),
        }
      );

      const data = await response.json();

      // Handle the response data as needed

      setReplyText("");
      setShowReplyInput(false);
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        "https://shared-server.onrender.com/api/auth/comments",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setCommentsContent(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !user) {
      router.push("/login"); // Redirect to login page
    } else {
      getComments();
    }
  }, [token, user, router]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <div>
        {commentsContent.map((comment: any) => {
          const isReplyOpen = selectedCommentId === comment._id;
          return (
            <div className="flex space-x-4 " key={comment._id}>
              <div className="flex-shrink-0">
                <Avatar
                  size="34"
                  name={comment.user.fullName}
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">
                    {comment.user.fullName}
                  </span>
                  <span className="text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                <p className="text-gray-800">{comment.content}</p>
                <button
                  className="text-teal-500 mt-2"
                  onClick={() => handleReplyClick(comment._id)}
                >
                  Reply
                </button>
                {isReplyOpen && (
                  <form className="mt-4" onSubmit={handleReplySubmit}>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={3}
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={handleInputChange}
                    ></textarea>
                    <button
                      className="px-4 py-2 mt-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}

                {/* Display replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-12 mt-4">
                    <button
                      className="text-teal-500 hover:text-teal-700 mb-6"
                      onClick={() => setShowReplyInput(!showReplyInput)}
                    >
                      {showReplyInput ? "Hide Replies" : "View Replies"}
                    </button>
                    {showReplyInput && (
                      <div className="mt-4 pb-6">
                        {comment.replies.map((reply: any) => (
                          <div key={reply.user._id}>
                            <span className="font-bold">
                              {reply.user.fullName}
                            </span>
                            <span className="text-gray-500 px-2">
                              {moment(reply.createdAt).fromNow()}
                            </span>
                            <p key={reply._id} className="text-gray-500 ml-4">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherMessage;
