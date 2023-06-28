"use client";

import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Avatar from "react-avatar";

export default function Input() {
  const user = useAuthStore((state: any) => state.user);
  const userId = user && user._id; // Check if user exists before accessing fullName
  const token = useAuthStore((state: any) => state.token);

  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://shared-server.onrender.com/api/auth/user/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId, // replace with the actual user ID
            content: text,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setText("");
        console.log(data); // handle the response data as needed
      } else {
        console.error("Failed to create a comment");
      }
    } catch (err) {
      console.error("Failed to create a comment", err);
    }
  };

  return (
    <div>
      <div className="flex items-center fixed bg-white bottom-0 left-0 w-full md:justify-center mb-4 px-4">
        {/* <Avatar size="60" className="w-10 h-10" name={user.fullName} /> */}
        <textarea
          rows={2}
          placeholder="Enter your comment..."
          className="px-3 border border-gray-300 rounded-md w-[245px] md:w-[450px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-teal-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
