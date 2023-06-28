"use client";

import { useAuthStore } from "@/store";
import React from "react";

export default function Profile() {
  const user = useAuthStore((state: any) => state.user);
  const userId = user && user._id;
  const fullName = user && user.fullName;
  const email = user && user.email;
  const commentsLength = user && user.comments.length;
  const repliesLength = user && user.replies.length;
  console.log(user);

  return (
    <div className="mt-36 mx-auto max-w-lg p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <span className="font-bold">ID:</span>
        {userId}
      </div>
      <div className="mb-4">
        <span className="font-bold">Name:</span> {fullName}
      </div>
      <div className="mb-4">
        <span className="font-bold">Email:</span> {email}
      </div>
      <div className="mb-4">
        <span className="font-bold">Total Comments:</span> {commentsLength}
      </div>
      <div className="mb-4">
        <span className="font-bold">Total Replies:</span> {repliesLength}
      </div>
    </div>
  );
}
