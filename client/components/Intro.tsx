"use client";

import { useAuthStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Intro() {
  const isLoggedIn = useAuthStore((state: any) => state.isLoggedIn);
  const user = useAuthStore((state: any) => state.user);
  const name = user && user.fullName; // Check if user exists before accessing fullName
  const [isHydrated, setIsHydrated] = useState(false); // Set initial state to false

  useEffect(() => {
    setIsHydrated(true); // Update the state to true after component is mounted
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <Image
          src="/head.png"
          height={350}
          width={350}
          alt="intro"
          className="md:hidden"
        />
        <Image
          src="/head.png"
          height={350}
          width={350}
          alt="intro"
          className="hidden md:block"
        />
      </div>
      <div className="md:w-1/2">
        {isHydrated && // Check if component is hydrated before rendering
          (isLoggedIn ? (
            <h1 className="text-3xl font-bold mb-4">Welcome, {name}</h1>
          ) : (
            <h1 className="text-3xl font-bold mb-4">Please login</h1>
          ))}
      </div>
    </div>
  );
}
